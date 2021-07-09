import { InputFileLike } from '../files'
import { tl } from '@mtcute/tl'
import { Venue } from './venue'
import { MaybeArray } from '@mtcute/core'
import { FormattedString } from '../parser'

interface BaseInputMedia {
    /**
     * File to be sent
     */
    file: InputFileLike

    /**
     * Caption of the media
     */
    caption?: string | FormattedString

    /**
     * Caption entities of the media.
     * If passed, parse mode is ignored
     */
    entities?: tl.TypeMessageEntity[]

    /**
     * Override file name for the file.
     *
     * Only applicable to newly uploaded files.
     */
    fileName?: string

    /**
     * Override MIME type for the file
     *
     * Only applicable to newly uploaded files.
     */
    fileMime?: string

    /**
     * Override file size for the file
     *
     * Only applicable to newly uploaded files.
     */
    fileSize?: number

    /**
     * TTL for the media in seconds.
     *
     * Only applicable to some media types
     */
    ttlSeconds?: number
}

/**
 * Automatically detect media type based on file contents.
 *
 * Photo type is only inferred for reused files,
 * newly uploaded photos with `auto` will be
 * uploaded as a document
 */
export interface InputMediaAuto extends BaseInputMedia {
    type: 'auto'
}

/**
 * An audio file or voice message to be sent
 */
export interface InputMediaAudio extends BaseInputMedia {
    type: 'audio'

    /**
     * Thumbnail of the audio file album cover.
     *
     * The thumbnail should be in JPEG format and less than 200 KB in size.
     * A thumbnail's width and height should not exceed 320 pixels.
     * Thumbnails can't be reused and can be only uploaded as a new file.
     *
     * Only applicable to newly uploaded files.
     */
    thumb?: InputFileLike

    /**
     * Duration of the audio in seconds
     *
     * Only applicable to newly uploaded files.
     */
    duration?: number

    /**
     * Performer of the audio
     *
     * Only applicable to newly uploaded files.
     */
    performer?: string

    /**
     * Title of the audio
     *
     * Only applicable to newly uploaded files.
     */
    title?: string
}

/**
 * Voice message to be sent
 */
export interface InputMediaVoice extends BaseInputMedia {
    type: 'voice'

    /**
     * Duration of the voice message in seconds
     *
     * Only applicable to newly uploaded files.
     */
    duration?: number

    /**
     * Waveform of the voice message
     *
     * Only applicable to newly uploaded files.
     */
    waveform?: Buffer
}

/**
 * A generic file to be sent
 */
export interface InputMediaDocument extends BaseInputMedia {
    type: 'document'

    /**
     * Thumbnail of the document.
     *
     * The thumbnail should be in JPEG format and less than 200 KB in size.
     * A thumbnail's width and height should not exceed 320 pixels.
     * Thumbnails can't be reused and can be only uploaded as a new file.
     *
     * Only applicable to newly uploaded files.
     */
    thumb?: InputFileLike
}

/**
 * A photo to be sent
 */
export interface InputMediaPhoto extends BaseInputMedia {
    type: 'photo'
}

/**
 * A sticker to be sent
 */
export interface InputMediaSticker extends BaseInputMedia {
    type: 'sticker'

    caption?: never
    entities?: never

    /**
     * Whether this sticker is animated?
     *
     * Note that animated stickers must be in TGS
     * format, which is Lottie JSON compressed using GZip
     *
     * Defaults to `false`
     *
     * Only applicable to newly uploaded files.
     */
    isAnimated?: boolean

    /**
     * An emoji representing this sticker
     *
     * Only applicable to newly uploaded files,
     * for some reason doesn't work with animated stickers.
     */
    alt?: string
}

/**
 * A video to be sent
 */
export interface InputMediaVideo extends BaseInputMedia {
    type: 'video'

    /**
     * Thumbnail of the video.
     *
     * The thumbnail should be in JPEG format and less than 200 KB in size.
     * A thumbnail's width and height should not exceed 320 pixels.
     * Thumbnails can't be reused and can be only uploaded as a new file.
     *
     * Only applicable to newly uploaded files.
     */
    thumb?: InputFileLike

    /**
     * Width of the video in pixels
     *
     * Only applicable to newly uploaded files.
     */
    width?: number

    /**
     * Height of the video in pixels
     *
     * Only applicable to newly uploaded files.
     */
    height?: number

    /**
     * Duration of the video in seconds
     *
     * Only applicable to newly uploaded files.
     */
    duration?: number

    /**
     * Whether the video is suitable for streaming
     *
     * Only applicable to newly uploaded files.
     */
    supportsStreaming?: boolean

    /**
     * Whether this video is an animated GIF
     *
     * Only applicable to newly uploaded files.
     */
    isAnimated?: boolean

    /**
     * Whether this video is a round message (aka video note)
     *
     * Only applicable to newly uploaded files.
     */
    isRound?: boolean
}

/**
 * A geolocation to be sent
 */
export interface InputMediaGeo {
    type: 'geo'

    /**
     * Latitude of the geolocation
     */
    latitude: number

    /**
     * Longitude of the geolocation
     */
    longitude: number

    /**
     * The estimated horizontal accuracy of the
     * geolocation, in meters (0-1500)
     */
    accuracy?: number
}

/**
 * A live geolocation to be sent
 */
export interface InputMediaGeoLive extends Omit<InputMediaGeo, 'type'> {
    type: 'geo_live'

    /**
     * Whether sending of the geolocation has stopped
     */
    stopped?: boolean

    /**
     * Direction in which the location moves, in degrees (1-360)
     */
    heading?: number

    /**
     * Validity period of the live location
     */
    period?: number

    /**
     * Maximum distance to another chat member for proximity
     * alerts, in meters (0-100000)
     */
    proximityNotificationRadius?: number
}

/**
 * An animated dice with a random value to be sent
 *
 * For convenience, known dice emojis are available
 * as static members of {@link Dice}.
 *
 * Note that dice result value is generated randomly on the server,
 * you can't influence it in any way!
 */
export interface InputMediaDice {
    type: 'dice'

    /**
     * Emoji representing a dice
     */
    emoji: string
}

/**
 * A venue to be sent
 */
export interface InputMediaVenue {
    type: 'venue'

    /**
     * Latitude of the geolocation
     */
    latitude: number

    /**
     * Longitude of the geolocation
     */
    longitude: number

    /**
     * Venue name
     */
    title: string

    /**
     * Venue address
     */
    address: string

    /**
     * When available, source from where this venue was acquired
     */
    source?: Venue.VenueSource
}

/**
 * A contact to be sent
 */
export interface InputMediaContact {
    type: 'contact'

    /**
     * Contact's phone number
     */
    phone: string

    /**
     * Contact's first name
     */
    firstName: string

    /**
     * Contact's last name
     */
    lastName?: string

    /**
     * Additional data about the contact
     * as a vCard (0-2048 bytes)
     */
    vcard?: string
}

/**
 * A game to be sent
 */
export interface InputMediaGame {
    type: 'game'

    /**
     * Game's short name, or a TL object with an input game
     */
    game: string | tl.TypeInputGame
}

/**
 * An invoice to be sent (see https://core.telegram.org/bots/payments)
 */
export interface InputMediaInvoice {
    type: 'invoice'

    /**
     * Product name (1-32 chars)
     */
    title: string

    /**
     * Product description (1-255 chars)
     */
    description: string

    /**
     * The invoice itself
     */
    invoice: tl.TypeInvoice

    /**
     * Bot-defined invoice payload (1-128 bytes).
     *
     * Will not be displayed to the user and can be used
     * for internal processes
     */
    payload: Buffer

    /**
     * Payments provider token, obtained from
     * [@BotFather](//t.me/botfather)
     */
    token: string

    /**
     * Data about the invoice as a plain JS object, which
     * will be shared with the payment provider. A detailed
     * description of required fields should be provided by
     * the payment provider.
     */
    providerData: any

    /**
     * Start parameter for the bot
     */
    startParam: string

    /**
     * Product photo. Can be a photo of the goods or a marketing image for a service.
     *
     * Can be a URL, or a TL object with input web document
     */
    photo?: string | tl.TypeInputWebDocument
}

/**
 * A simple poll to be sent
 */
export interface InputMediaPoll {
    type: 'poll'

    /**
     * Question of the poll (1-255 chars for users, 1-300 chars for bots)
     */
    question: string

    /**
     * Answers of the poll.
     *
     * You can either provide a string, or a
     * TL object representing an answer.
     * Strings will be transformed to TL
     * objects, with a single=byte incrementing
     * `option` value.
     */
    answers: (string | tl.TypePollAnswer)[]

    /**
     * Whether this is poll is closed
     * (i.e. nobody can vote anymore)
     */
    closed?: boolean

    /**
     * Whether this is a public poll
     * (i.e. users who have voted are visible to everyone)
     */
    public?: boolean

    /**
     * Whether users can select multiple answers
     * as an answer
     */
    multiple?: boolean

    /**
     * Amount of time in seconds the poll will be active after creation (5-600).
     *
     * Can't be used together with `closeDate`.
     */
    closePeriod?: number

    /**
     * Point in time when the poll will be automatically closed.
     *
     * Must be at least 5 and no more than 600 seconds in the future,
     * can't be used together with `closePeriod`.
     *
     * When `number` is used, UNIX time in ms is expected
     */
    closeDate?: number | Date
}

/**
 * A quiz to be sent.
 *
 * Quiz is an extended version of a poll, but quizzes have
 * correct answers, and votes can't be retracted from them
 */
export interface InputMediaQuiz extends Omit<InputMediaPoll, 'type'> {
    type: 'quiz'

    /**
     * Correct answer ID(s) or index(es).
     *
     * > **Note**: even though quizzes can actually
     * > only have exactly one correct answer,
     * > the API itself has the possibility to pass
     * > multiple or zero correct answers,
     * > but that would result in `QUIZ_CORRECT_ANSWERS_TOO_MUCH`
     * > and `QUIZ_CORRECT_ANSWERS_EMPTY` errors respectively.
     * >
     * > But since the API has that option, we also provide it,
     * > maybe to future-proof this :shrug:
     */
    correct: MaybeArray<number | Buffer>

    /**
     * Explanation of the quiz solution
     */
    solution?: string | FormattedString

    /**
     * Format entities for `solution`.
     * If used, parse mode is ignored.
     */
    solutionEntities?: tl.TypeMessageEntity[]
}

/**
 * Input media that can have a caption.
 *
 * Note that meta-fields (like `duration`) are only
 * applicable if `file` is {@link UploadFileLike},
 * otherwise they are ignored.
 *
 * A subset of {@link InputMediaLike}
 */
export type InputMediaWithCaption =
    | InputMediaAudio
    | InputMediaVoice
    | InputMediaDocument
    | InputMediaPhoto
    | InputMediaVideo
    | InputMediaAuto

/**
 * Input media that can be sent somewhere.
 *
 * Note that meta-fields (like `duration`) are only
 * applicable if `file` is {@link UploadFileLike},
 * otherwise they are ignored.
 *
 * @link InputMedia
 */
export type InputMediaLike =
    | InputMediaWithCaption
    | InputMediaSticker
    | InputMediaVenue
    | InputMediaGeo
    | InputMediaGeoLive
    | InputMediaDice
    | InputMediaContact
    | InputMediaGame
    | InputMediaInvoice
    | InputMediaPoll
    | InputMediaQuiz
    | tl.TypeInputMedia

export namespace InputMedia {
    type OmitTypeAndFile<
        T extends InputMediaLike,
        K extends keyof T = never
    > = Omit<T, 'type' | 'file' | K>

    /**
     * Create an animation to be sent
     *
     * @param file  Animation
     * @param params  Additional parameters
     */
    export function animation(
        file: InputFileLike,
        params: OmitTypeAndFile<InputMediaVideo> = {}
    ): InputMediaVideo {
        const ret = params as tl.Mutable<InputMediaVideo>
        ret.type = 'video'
        ret.file = file
        ret.isAnimated = true
        return ret
    }

    /**
     * Create an audio to be sent
     *
     * @param file  Audio file
     * @param params  Additional parameters
     */
    export function audio(
        file: InputFileLike,
        params: OmitTypeAndFile<InputMediaAudio> = {}
    ): InputMediaAudio {
        const ret = params as tl.Mutable<InputMediaAudio>
        ret.type = 'audio'
        ret.file = file
        return ret
    }

    /**
     * Create an document to be sent
     *
     * @param file  Document
     * @param params  Additional parameters
     */
    export function document(
        file: InputFileLike,
        params: OmitTypeAndFile<InputMediaDocument> = {}
    ): InputMediaDocument {
        const ret = params as tl.Mutable<InputMediaDocument>
        ret.type = 'document'
        ret.file = file
        return ret
    }

    /**
     * Create an photo to be sent
     *
     * @param file  Photo
     * @param params  Additional parameters
     */
    export function photo(
        file: InputFileLike,
        params: OmitTypeAndFile<InputMediaPhoto> = {}
    ): InputMediaPhoto {
        const ret = params as tl.Mutable<InputMediaPhoto>
        ret.type = 'photo'
        ret.file = file
        return ret
    }

    /**
     * Create an video to be sent
     *
     * @param file  Video
     * @param params  Additional parameters
     */
    export function video(
        file: InputFileLike,
        params: OmitTypeAndFile<InputMediaVideo> = {}
    ): InputMediaVideo {
        const ret = params as tl.Mutable<InputMediaVideo>
        ret.type = 'video'
        ret.file = file
        return ret
    }

    /**
     * Create a voice note to be sent
     *
     * @param file  Voice note
     * @param params  Additional parameters
     */
    export function voice(
        file: InputFileLike,
        params: OmitTypeAndFile<InputMediaVoice> = {}
    ): InputMediaVoice {
        const ret = params as tl.Mutable<InputMediaVoice>
        ret.type = 'voice'
        ret.file = file
        return ret
    }

    /**
     * Create a sticker to be sent
     *
     * @param file  Sticker
     * @param params  Additional parameters
     */
    export function sticker(
        file: InputFileLike,
        params: OmitTypeAndFile<InputMediaSticker> = {}
    ): InputMediaSticker {
        const ret = params as tl.Mutable<InputMediaSticker>
        ret.type = 'sticker'
        ret.file = file
        return ret
    }

    /**
     * Create a venue to be sent
     *
     * @param params  Venue parameters
     */
    export function venue(
        params: OmitTypeAndFile<InputMediaVenue>
    ): InputMediaVenue {
        const ret = params as tl.Mutable<InputMediaVenue>
        ret.type = 'venue'
        return ret
    }

    /**
     * Create a geolocation to be sent
     *
     * @param latitude  Latitude of the location
     * @param longitude  Longitude of the location
     * @param params  Additional parameters
     */
    export function geo(
        latitude: number,
        longitude: number,
        params: OmitTypeAndFile<InputMediaGeo, 'latitude' | 'longitude'> = {}
    ): InputMediaGeo {
        const ret = params as tl.Mutable<InputMediaGeo>
        ret.type = 'geo'
        ret.latitude = latitude
        ret.longitude = longitude
        return ret
    }

    /**
     * Create a live geolocation to be sent
     *
     * @param latitude  Latitude of the current location
     * @param longitude  Longitude of the current location
     * @param params  Additional parameters
     */
    export function geoLive(
        latitude: number,
        longitude: number,
        params: OmitTypeAndFile<
            InputMediaGeoLive,
            'latitude' | 'longitude'
        > = {}
    ): InputMediaGeoLive {
        const ret = params as tl.Mutable<InputMediaGeoLive>
        ret.type = 'geo_live'
        ret.latitude = latitude
        ret.longitude = longitude
        return ret
    }

    /**
     * Create a dice to be sent
     *
     * For convenience, known dice emojis are available
     * as static members of {@link Dice}.
     *
     * @param emoji  Emoji representing the dice
     */
    export function dice(emoji: string): InputMediaDice {
        return {
            type: 'dice',
            emoji,
        }
    }

    /**
     * Create a contact to be sent
     *
     * @param params  Contact parameters
     */
    export function contact(
        params: OmitTypeAndFile<InputMediaContact>
    ): InputMediaContact {
        const ret = params as tl.Mutable<InputMediaContact>
        ret.type = 'contact'
        return ret
    }

    /**
     * Create a game to be sent
     *
     * @param game  Game short name or TL object representing one
     */
    export function game(game: string | tl.TypeInputGame): InputMediaGame {
        return {
            type: 'game',
            game,
        }
    }

    /**
     * Create an invoice to be sent
     *
     * @param params  Invoice parameters
     */
    export function invoice(
        params: OmitTypeAndFile<InputMediaInvoice>
    ): InputMediaInvoice {
        const ret = params as tl.Mutable<InputMediaInvoice>
        ret.type = 'invoice'
        return ret
    }

    /**
     * Create a poll to be sent
     *
     * @param params  Poll parameters
     */
    export function poll(
        params: OmitTypeAndFile<InputMediaPoll>
    ): InputMediaPoll {
        const ret = params as tl.Mutable<InputMediaPoll>
        ret.type = 'poll'
        return ret
    }

    /**
     * Create a quiz to be sent
     *
     * @param params  Quiz parameters
     */
    export function quiz(
        params: OmitTypeAndFile<InputMediaQuiz>
    ): InputMediaQuiz {
        const ret = params as tl.Mutable<InputMediaQuiz>
        ret.type = 'quiz'
        return ret
    }

    /**
     * Create a document to be sent, which subtype
     * is inferred automatically by file contents.
     *
     * Photo type is only inferred for reused files,
     * newly uploaded photos with `auto` will be
     * uploaded as a document
     *
     * @param file  The media file
     * @param params  Additional parameters
     */
    export function auto(
        file: InputFileLike,
        params: OmitTypeAndFile<InputMediaAuto> = {}
    ): InputMediaAuto {
        const ret = params as tl.Mutable<InputMediaAuto>
        ret.type = 'auto'
        ret.file = file
        return ret
    }
}
