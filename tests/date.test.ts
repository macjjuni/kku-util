import { dateUtil } from '../src'
import dayjs, { ManipulateType } from 'dayjs'
import { describe, it, expect } from 'vitest'

const {
    formatConfig: format,
    getCurrentDate,
    getDayJsDate,
    getFormatDate,
    calcDate,
    calcCurrentDateDifference,
    convertToTimestamp,
} = dateUtil

interface TargetInfo {
    unit: ManipulateType
    diff: number
}

describe('date util test', () => {
    describe('getCurrentNow', () => {
        it('getCurrentNow function returns the current date in the correct format', () => {
            const expectedCurrentDate = dayjs().format('YYYY-MM-DD HH:mm')
            const currentDate = getCurrentDate('YYYY-MM-DD HH:mm')
            expect(expectedCurrentDate).toBe(currentDate)
        })

        it('getCurrentNow function with no params returns the current date in the correct format', () => {
            const expectedCurrentDate = dayjs().format(format.detail)
            const currentDate = getCurrentDate()
            expect(expectedCurrentDate).toBe(currentDate)
        })
    })

    describe('getFormatDate', () => {
        it('formats the current date correctly according to the provided format', () => {
            const currentDate = dayjs().format()
            const expectedDate = dayjs(currentDate).format(format.detail)
            const targetDate = getFormatDate(currentDate, format.detail)
            expect(expectedDate).toBe(targetDate)
        })

        it('formats the specific date correctly according to the provided format', () => {
            const specificDate = '2024-12-12'
            const expectedDate = dayjs(specificDate).format(format.default)
            const targetDate = getFormatDate(specificDate, format.default)
            expect(expectedDate).toBe(targetDate)
        })

        it('formats the current date correctly for multiple formats', () => {
            const firstSpecificFormat = 'dddd, MMMM D, YYYY'
            const secondSpecificFormat = 'MM/DD/YYYY'
            const currentDate = dayjs().format()
            const expectedDate1 = dayjs(currentDate).format(firstSpecificFormat)
            const targetDate1 = getFormatDate(currentDate, firstSpecificFormat)
            const expectedDate2 = dayjs(currentDate).format(secondSpecificFormat)
            const targetDate2 = getFormatDate(currentDate, secondSpecificFormat)

            expect(expectedDate1).toBe(targetDate1)
            expect(expectedDate2).toBe(targetDate2)
        })

        it('should format the current timestamp consistently between dayjs and getFormatDate', () => {
            const currentTimeStamp = new Date().getTime()
            const expectedDate = dayjs(currentTimeStamp).format(format.detail)
            const targetDate = getFormatDate(currentTimeStamp, format.detail)
            expect(expectedDate).toBe(targetDate)
        })

        it('should format the current timestamp consistently between dayjs and getFormatDate', () => {
            const currentTimeStamp = 1730944817
            const expectedDate = dayjs(currentTimeStamp * 1000).format(format.detail)
            const targetDate = getFormatDate(currentTimeStamp, format.detail)
            expect(expectedDate).toBe(targetDate)
        })
    })

    describe('convertToTimestamp', () => {
        it('should format the current timestamp consistently between dayjs and getFormatDate', () => {
            const expectedTimestamp = new Date().getTime()
            const currentFormattedDate = getFormatDate(expectedTimestamp, format.detail)
            const targetTimestamp = convertToTimestamp(currentFormattedDate)

            expect(targetTimestamp).toBeGreaterThanOrEqual(expectedTimestamp - 1000)
            expect(targetTimestamp).toBeLessThanOrEqual(expectedTimestamp + 1000)
        })
    })

    describe('calcDate', () => {
        it('should calculate the date correctly by adding days', () => {
            const currentDate = dayjs().format()
            const targetFormat = format.detail
            const targetUnit = 'day'
            const targetAmount = 7
            const expectedDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat)
            const targetDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat)
            expect(expectedDate).toBe(targetDate)
        })

        it('should calculate the date correctly by subtracting days', () => {
            const currentDate = dayjs().format()
            const targetFormat = format.detail
            const targetUnit = 'day'
            const targetAmount = -5
            const expectedDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat)
            const targetDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat)
            expect(expectedDate).toBe(targetDate)
        })

        it('should calculate the date correctly by adding months', () => {
            const currentDate = dayjs().format()
            const targetFormat = format.detail
            const targetAmount = 2
            const targetUnit = 'month'
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat)
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat)
            expect(actualDate).toBe(expectedDate)
        })

        it('should calculate the date correctly by subtracting months', () => {
            const currentDate = dayjs().format()
            const targetFormat = format.detail
            const targetAmount = -3
            const targetUnit = 'month'
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat)
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat)
            expect(actualDate).toBe(expectedDate)
        })

        it('should calculate the date correctly by adding years', () => {
            const currentDate = dayjs().format()
            const targetFormat = format.detail
            const targetAmount = 1
            const targetUnit = 'year'
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat)
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat)
            expect(actualDate).toBe(expectedDate)
        })

        it('should calculate the date correctly by subtracting years', () => {
            const currentDate = dayjs().format()
            const targetFormat = format.detail
            const targetAmount = -1
            const targetUnit = 'year'
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat)
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat)
            expect(actualDate).toBe(expectedDate)
        })
    })

    describe('calcCurrentDateDifference', () => {
        it('should calculate the difference in seconds correctly', () => {
            const targetInfo: TargetInfo = { unit: 'second', diff: 30 }
            const currentDate = getDayJsDate(getCurrentDate(format.detail))
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit)
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit)
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit)
            expect(actualDifference).toBeCloseTo(expectedDifference, 0)
        })

        it('should calculate the difference in minutes correctly', () => {
            const targetInfo: TargetInfo = { unit: 'minute', diff: 5 }
            const currentDate = getDayJsDate(getCurrentDate(format.detail))
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit)
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit)
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit)
            expect(actualDifference).toBeCloseTo(expectedDifference, 0)
        })

        it('should calculate the difference in hours correctly', () => {
            const targetInfo: TargetInfo = { unit: 'hour', diff: 3 }
            const currentDate = getDayJsDate(getCurrentDate(format.detail))
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit)
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit)
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit)
            expect(actualDifference).toBeCloseTo(expectedDifference, 0)
        })

        it('should calculate the difference in days correctly', () => {
            const targetInfo: TargetInfo = { unit: 'day', diff: 10 }
            const currentDate = getDayJsDate(getCurrentDate(format.detail))
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit)
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit)
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit)
            expect(actualDifference).toBeCloseTo(expectedDifference, 0)
        })

        it('should calculate the difference in months correctly', () => {
            const targetInfo: TargetInfo = { unit: 'month', diff: 3 }
            const currentDate = getDayJsDate(getCurrentDate(format.detail))
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit)
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit)
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit)
            expect(actualDifference).toBeCloseTo(expectedDifference, 0)
        })

        it('should calculate the difference in years correctly', () => {
            const targetInfo: TargetInfo = { unit: 'year', diff: 12 }
            const currentDate = getDayJsDate(getCurrentDate(format.detail))
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit)
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit)
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit)
            expect(actualDifference).toBeCloseTo(expectedDifference, 0)
        })

        it('should return a negative difference for past dates in seconds', () => {
            const targetInfo: TargetInfo = { unit: 'second', diff: 10 }
            const currentDate = getDayJsDate(getCurrentDate(format.detail))
            const targetDate = dayjs(currentDate).subtract(targetInfo.diff, targetInfo.unit)
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit)
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit)
            expect(actualDifference).toBeCloseTo(expectedDifference, 0)
        })

        it('should return a negative difference for past dates in minutes', () => {
            const targetInfo: TargetInfo = { unit: 'minute', diff: 2 }
            const currentDate = getDayJsDate(getCurrentDate(format.detail))
            const targetDate = dayjs(currentDate).subtract(targetInfo.diff, targetInfo.unit)
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit)
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit)
            expect(actualDifference).toBeCloseTo(expectedDifference, 0)
        })

        it('should return a negative difference for past dates in hours', () => {
            const targetInfo: TargetInfo = { unit: 'hour', diff: 1 }
            const currentDate = getDayJsDate(getCurrentDate(format.detail))
            const targetDate = dayjs(currentDate).subtract(targetInfo.diff, targetInfo.unit)
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit)
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit)
            expect(actualDifference).toBeCloseTo(expectedDifference, 0)
        })

        it('should return a negative difference for past dates in days', () => {
            const targetInfo: TargetInfo = { unit: 'day', diff: 5 }
            const currentDate = getDayJsDate(getCurrentDate(format.detail))
            const targetDate = dayjs(currentDate).subtract(targetInfo.diff, targetInfo.unit)
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit)
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit)
            expect(actualDifference).toBeCloseTo(expectedDifference, 0)
        })
    })
})
