import { expect } from 'chai'

import { __getWasm, initAsync } from '../src/index.js'

before(async () => {
    await initAsync()
})

describe('allocator', () => {
    it('should not leak memory', () => {
        const wasm = __getWasm()
        const memUsage = wasm.memory.buffer.byteLength

        for (let i = 0; i < 1024; i++) {
            const ptr = wasm.__malloc(1024)
            wasm.__free(ptr)
        }

        expect(wasm.memory.buffer.byteLength).to.equal(memUsage)
    })
})
