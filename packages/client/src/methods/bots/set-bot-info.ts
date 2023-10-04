import { TelegramClient } from '../../client'
import { InputPeerLike } from '../../types'
import { normalizeToInputUser } from '../../utils/peer-utils'

/**
 * Sets information about a bot the current uzer owns (or the current bot)
 *
 * @internal
 */
export async function setBotInfo(
    this: TelegramClient,
    params: {
        /**
         * When called by a user, a bot the user owns must be specified.
         * When called by a bot, must be empty
         */
        bot?: InputPeerLike

        /**
         * If passed, will update the bot's description in the given language.
         * If left empty, will change the fallback description.
         */
        langCode?: string

        /** New bot name */
        name?: string

        /** New bio text (displayed in the profile) */
        bio?: string

        /** New description text (displayed when the chat is empty) */
        description?: string
    },
): Promise<void> {
    const { bot, langCode = '', name, bio, description } = params

    await this.call({
        _: 'bots.setBotInfo',
        bot: bot ? normalizeToInputUser(await this.resolvePeer(bot), bot) : undefined,
        langCode: langCode,
        name,
        about: bio,
        description,
    })
}