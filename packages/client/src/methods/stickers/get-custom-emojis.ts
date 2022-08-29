import { tl } from '@mtcute/tl'

import { TelegramClient } from '../../client'
import { MtTypeAssertionError, Sticker } from '../../types'
import { parseDocument } from '../../types/media/document-utils'
import { assertTypeIs } from '../../utils/type-assertion'

/**
 * Get custom emoji stickers by their IDs
 *
 * @param ids  IDs of the stickers (as defined in {@link MessageEntity.emojiId})
 * @internal
 */
export async function getCustomEmojis(
    this: TelegramClient,
    ids: tl.Long[]
): Promise<Sticker[]> {
    const res = await this.call({
        _: 'messages.getCustomEmojiDocuments',
        documentId: ids,
    })

    return res.map((it) => {
        assertTypeIs('getCustomEmojis', it, 'document')

        const doc = parseDocument(this, it)
        if ((doc as Sticker).type !== 'sticker') {
            throw new MtTypeAssertionError(
                'getCustomEmojis',
                'sticker',
                (doc as any).type
            )
        }

        return doc as Sticker
    })
}