# @mtcute/deno

📖 [API Reference](https://ref.mtcute.dev/modules/_mtcute_deno.html)

‼️ **Experimental** Deno support package for mtcute. Includes:
- SQLite storage (based on [`@db/sqlite`](https://jsr.io/@db/sqlite))
- TCP transport (based on Deno-native APIs)
- `TelegramClient` implementation using the above
- HTML and Markdown parsers

## Usage

```typescript
import { TelegramClient } from '@mtcute/deno'

const tg = new TelegramClient({
    apiId: 12345,
    apiHash: 'abcdef',
    storage: 'my-account'
})

tg.run(async (user) => {
    console.log(`✨ logged in as ${user.displayName}`)
})
```
