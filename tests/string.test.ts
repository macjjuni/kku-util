import { describe, it, expect } from 'vitest'
import { stringUtil } from '../src'

const { isNumber, extractStringNumber, comma, getUuid } = stringUtil

describe('string util test', () => {
    describe('isNumber', () => {
        it('should return true when the target is a number', () => {
            const targetStr = 123456789
            const expectData = isNumber(targetStr)

            expect(expectData).toBeTruthy()
        })

        it('should return true when the target string contains only numeric characters', () => {
            const targetStr = '123123213'
            const expectData = isNumber(targetStr)

            expect(expectData).toBeTruthy()
        })

        it('should return false for non-numeric strings', () => {
            const targetStr = '123123213abc'
            const expectData = isNumber(targetStr)

            expect(expectData).not.toBeTruthy()
        })
    })

    describe('extractNumber', () => {
        it('should extract only the number from a mixed string', () => {
            const targetStrNum = '123456789'
            const targetOnlyStr = 'abc'
            const expectData = extractStringNumber(`${targetStrNum}${targetOnlyStr}`)

            expect(expectData).toBe(targetStrNum)
        })
    })

    describe('comma', () => {
        it('should format the number with commas every three digits', () => {
            const targetNum = 123456789
            const expectData = comma(targetNum)

            expect(expectData).toBe('123,456,789')
        })

        it('should format the number with commas every three digits', () => {
            const targetNum = -777777
            const expectData = comma(targetNum)

            expect(expectData).toBe('-777,777')
        })
    })

    describe('getUuid', () => {
        it('should generate a valid UUID', () => {
            const expectData = getUuid()

            expect(expectData).toBeTruthy()
        })
    })
})
