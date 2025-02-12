import { tl } from '@mtcute/tl'

import { getPlatform } from '../../../platform.js'
import { ControllablePromise, createControllablePromise } from '../../../utils/controllable-promise.js'
import { sleepWithAbort } from '../../../utils/misc-utils.js'
import { assertTypeIs } from '../../../utils/type-assertions.js'
import { ITelegramClient, ServerUpdateHandler } from '../../client.types.js'
import { MaybeDynamic, User } from '../../types/index.js'
import { resolveMaybeDynamic } from '../../utils/misc-utils.js'
import { checkPassword } from './check-password.js'

// @available=user
/**
 * Execute the [QR login flow](https://core.telegram.org/api/qr-login).
 *
 * This method will resolve once the authorization is complete,
 * returning the authorized user.
 */
export async function signInQr(
    client: ITelegramClient,
    params: {
        /**
         * Function that will be called whenever the login URL is changed.
         *
         * The app is expected to display `url` as a QR code to the user
         */
        onUrlUpdated: (url: string, expires: Date) => void

        /** Password for 2FA */
        password?: MaybeDynamic<string>

        /** Abort signal */
        abortSignal?: AbortSignal
    },
): Promise<User> {
    const { onUrlUpdated, abortSignal } = params

    let waiter: ControllablePromise<void> | undefined

    // crutch – we need to wait for the updateLoginToken update.
    // we replace the server update handler temporarily because:
    //   - updates manager may be disabled, in which case `onUpdate` will never be called
    //   - even if the updates manager is enabled, it won't start until we're logged in
    //
    // todo: how can we make this more clean?
    const originalHandler = client.getServerUpdateHandler()

    const onUpdate: ServerUpdateHandler = (upd) => {
        if (upd._ === 'updateShort' && upd.update._ === 'updateLoginToken') {
            waiter?.resolve()
            client.onServerUpdate(originalHandler)
        }
    }

    client.onServerUpdate(onUpdate)

    abortSignal?.addEventListener('abort', () => {
        client.onServerUpdate(originalHandler)
        waiter?.reject(abortSignal.reason)
    })

    try {
        const { id, hash } = await client.getApiCrenetials()
        const platform = getPlatform()

        loop: while (true) {
            let res: tl.auth.TypeLoginToken

            try {
                res = await client.call(
                    {
                        _: 'auth.exportLoginToken',
                        apiId: id,
                        apiHash: hash,
                        exceptIds: [],
                    },
                    { abortSignal },
                )
            } catch (e) {
                if (tl.RpcError.is(e, 'SESSION_PASSWORD_NEEDED') && params.password) {
                    return checkPassword(client, await resolveMaybeDynamic(params.password))
                }

                throw e
            }

            switch (res._) {
                case 'auth.loginToken':
                    onUrlUpdated(
                        `tg://login?token=${platform.base64Encode(res.token, true)}`,
                        new Date(res.expires * 1000),
                    )

                    waiter = createControllablePromise()
                    await Promise.race([waiter, sleepWithAbort(res.expires * 1000 - Date.now(), client.stopSignal)])
                    break
                case 'auth.loginTokenMigrateTo': {
                    await client.changePrimaryDc(res.dcId)

                    let res2: tl.auth.TypeLoginToken

                    try {
                        res2 = await client.call(
                            {
                                _: 'auth.importLoginToken',
                                token: res.token,
                            },
                            { abortSignal },
                        )
                    } catch (e) {
                        if (tl.RpcError.is(e, 'SESSION_PASSWORD_NEEDED') && params.password) {
                            return checkPassword(client, await resolveMaybeDynamic(params.password))
                        }

                        throw e
                    }

                    assertTypeIs('auth.importLoginToken', res2, 'auth.loginTokenSuccess')
                    break loop
                }
                case 'auth.loginTokenSuccess':
                    break loop
            }
        }

        const [self] = await client.call(
            {
                _: 'users.getUsers',
                id: [{ _: 'inputUserSelf' }],
            },
            { abortSignal },
        )
        assertTypeIs('users.getUsers', self, 'user')

        await client.notifyLoggedIn(self)

        return new User(self)
    } finally {
        client.onServerUpdate(originalHandler)
    }
}
