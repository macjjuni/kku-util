import { clipboardUtil } from '../src'
import { vi, describe, it, beforeAll, beforeEach, afterEach, expect } from 'vitest'

const { copyToClipboard } = clipboardUtil
const testStrText = 'test text 123'
const testNumText = 12341234

describe('copyToClipboard', () => {
    let writeTextMock

    beforeAll(() => {
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText: vi.fn() },
            configurable: true,
        })
    })

    beforeEach(() => {
        writeTextMock = vi.spyOn(navigator.clipboard, 'writeText')
        writeTextMock.mockResolvedValue(undefined)

        vi.spyOn(console, 'error').mockImplementation(() => {}) // 콘솔 에러 무시
    })

    afterEach(() => {
        writeTextMock.mockRestore()
    })

    it('should copy text to clipboard and return true on success', async () => {
        const expectedResult = await copyToClipboard(testStrText)

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testStrText)
        expect(expectedResult).toBeTruthy()
    })

    it('should copy number to clipboard and return true on success', async () => {
        const expectedResult = await copyToClipboard(testNumText)
        const targetText = testNumText.toString()

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(targetText)
        expect(expectedResult).toBeTruthy()
    })

    it('should return false if copying fails', async () => {
        writeTextMock.mockRejectedValue(new Error('Copy failed'))

        const result = await copyToClipboard('test text')

        expect(result).toBe(false)
        expect(writeTextMock).toHaveBeenCalledWith('test text')
    })
})
