import { createRequire } from 'module'

import type { TlEntry } from '@mtcute/tl-utils'

let _cachedEntriesMap: Map<string, TlEntry> | null = null
let _cachedUnionsMap: Map<string, TlEntry[]> | null = null

/** @internal */
export function getEntriesMap() {
    if (_cachedEntriesMap) {
        return {
            entries: _cachedEntriesMap,
            unions: _cachedUnionsMap!,
        }
    }

    const schema = createRequire(import.meta.url)('@mtcute/tl/api-schema.json') as {
        e: TlEntry[]
    }

    _cachedEntriesMap = new Map()
    _cachedUnionsMap = new Map()

    let entry: TlEntry

    for (entry of schema.e) {
        _cachedEntriesMap.set(entry.name, entry)

        if (!_cachedUnionsMap.has(entry.type)) {
            _cachedUnionsMap.set(entry.type, [])
        }
        _cachedUnionsMap.get(entry.type)!.push(entry)
    }

    return {
        entries: _cachedEntriesMap,
        unions: _cachedUnionsMap,
    }
}
