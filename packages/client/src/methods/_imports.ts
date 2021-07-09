/* eslint-disable @typescript-eslint/no-unused-vars */

// @copy
import { Readable } from 'stream'

// @copy
import {
    User,
    Chat,
    ChatPreview,
    ChatMember,
    Dialog,
    TermsOfService,
    SentCode,
    MaybeDynamic,
    InputPeerLike,
    UploadedFile,
    UploadFileLike,
    InputFileLike,
    PartialExcept,
    PartialOnly,
    FileDownloadParameters,
    Message,
    ReplyMarkup,
    InputMediaLike,
    InputInlineResult,
    InputStickerSetItem,
    TakeoutSession,
    StickerSet,
    Poll,
    TypingStatus,
    Photo,
    ChatEvent,
    ChatInviteLink,
    UsersIndex,
    ChatsIndex,
    GameHighScore,
    ArrayWithTotal,
    BotCommands,
    MessageMedia,
    RawDocument,
    IMessageEntityParser,
    FormattedString
} from '../types'

// @copy
import {
    MaybeArray,
    MaybeAsync,
    TelegramConnection,
    AsyncLock,
} from '@mtcute/core'

// @copy
import { tdFileId } from '@mtcute/file-id'
