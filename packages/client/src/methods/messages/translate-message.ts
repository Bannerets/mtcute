import { TelegramClient } from '../../client'
import { InputPeerLike, MessageEntity } from '../../types'

/**
 * Translate message text to a given language.
 *
 * Returns `null` if it could not translate the message.
 *
 * > **Note**: For now doesn't seem to work, returns null for all messages.
 *
 * @param chatId  Chat or user ID
 * @param messageId  Identifier of the message to translate
 * @param toLanguage  Target language (two-letter ISO 639-1 language code)
 * @internal
 */
export async function translateMessage(
    this: TelegramClient,
    chatId: InputPeerLike,
    messageId: number,
    toLanguage: string,
): Promise<[string, MessageEntity[]] | null> {
    const res = await this.call({
        _: 'messages.translateText',
        peer: await this.resolvePeer(chatId),
        id: [messageId],
        toLang: toLanguage,
    })

    return [res.result[0].text, res.result[0].entities.map((it) => new MessageEntity(it, res.result[0].text))]
}
