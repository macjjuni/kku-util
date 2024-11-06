import {dateUtil} from '@/index';
import dayjs, {ManipulateType} from 'dayjs';

const {formatConfig: format, getCurrentDate, getDayJsDate, getFormatDate, calcDate, calcCurrentDateDifference} = dateUtil;

interface TargetInfo {
    unit: ManipulateType;
    diff: number;
}


describe('date util test', () => {

    describe('getCurrentNow', () => {

        it('getCurrentNow function returns the current date in the correct format', () => {
            // Arrange
            const expectedCurrentDate = dayjs().format('YYYY-MM-DD HH:mm');
            const currentDate = getCurrentDate('YYYY-MM-DD HH:mm');

            // Assert
            expect(expectedCurrentDate).toBe(currentDate);
        });

        it('getCurrentNow function with no params returns the current date in the correct format', () => {
            // Arrange
            const expectedCurrentDate = dayjs().format(format.detail);
            const currentDate = getCurrentDate();

            // Assert
            expect(expectedCurrentDate).toBe(currentDate);
        });
    });


    describe('getFormatDate', () => {

        it('formats the current date correctly according to the provided format', () => {
            // Arrange
            const currentDate = dayjs().format();
            const expectedDate = dayjs(currentDate).format(format.detail);
            const targetDate = getFormatDate(currentDate, format.detail);

            // Assert
            expect(expectedDate).toBe(targetDate);
        });

        it('formats the specific date correctly according to the provided format', () => {
            // Arrange
            const specificDate = '2024-12-12';
            const expectedDate = dayjs(specificDate).format(format.default);
            const targetDate = getFormatDate(specificDate, format.default);

            // Assert
            expect(expectedDate).toBe(targetDate);
        });

        it('formats the current date correctly for multiple formats', () => {
            // Arrange
            const firstSpecificFormat = 'dddd, MMMM D, YYYY';
            const secondSpecificFormat = 'MM/DD/YYYY';
            const currentDate = dayjs().format();
            const expectedDate1 = dayjs(currentDate).format(firstSpecificFormat);
            const targetDate1 = getFormatDate(currentDate, firstSpecificFormat);
            const expectedDate2 = dayjs(currentDate).format(secondSpecificFormat);
            const targetDate2 = getFormatDate(currentDate, secondSpecificFormat);

            // Assert
            expect(expectedDate1).toBe(targetDate1);
            expect(expectedDate2).toBe(targetDate2);
        });

        it('should format the current timestamp consistently between dayjs and getFormatDate', () => {
            // Arrange
            const currentTimeStamp = new Date().getTime();
            const expectedDate = dayjs(currentTimeStamp).format(format.detail);
            const targetDate = getFormatDate(currentTimeStamp, format.detail);

            // Assert
            expect(expectedDate).toBe(targetDate);
        });
    });


    describe('calcDate', () => {

        it('should calculate the date correctly by adding days', () => {
            // Arrange
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetUnit = 'day';
            const targetAmount = 7;
            const expectedDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);
            const targetDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);

            // Assert
            expect(expectedDate).toBe(targetDate);
        });

        it('should calculate the date correctly by subtracting days', () => {
            // Arrange
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetUnit = 'day';
            const targetAmount = -5;
            const expectedDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);
            const targetDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);

            // Assert
            expect(expectedDate).toBe(targetDate);
        });

        it('should calculate the date correctly by adding months', () => {
            // Arrange
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetAmount = 2;
            const targetUnit = 'month';
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);

            // Assert
            expect(actualDate).toBe(expectedDate);
        });

        it('should calculate the date correctly by subtracting months', () => {
            // Arrange
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetAmount = -3;
            const targetUnit = 'month';
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);

            // Assert
            expect(actualDate).toBe(expectedDate);
        });


        it('should calculate the date correctly by adding years', () => {
            // Arrange
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetAmount = 1;
            const targetUnit = 'year';
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);

            // Assert
            expect(actualDate).toBe(expectedDate);
        });

        it('should calculate the date correctly by subtracting years', () => {
            // Arrange
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetAmount = -1;
            const targetUnit = 'year';
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);

            // Assert
            expect(actualDate).toBe(expectedDate);
        });
    });

    describe('calcCurrentDateDifference', () => {

        it('should calculate the difference in seconds correctly', () => {
            // Arrange
            const targetInfo: TargetInfo = { unit: 'second', diff: 30 };
            const currentDate = getDayJsDate(getCurrentDate(format.detail));
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit); // 현재 시간에서 30초 후
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit);
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit);

            // Assert
            expect(actualDifference).toBeCloseTo(expectedDifference, 0);
        });

        it('should calculate the difference in minutes correctly', () => {
            // Arrange
            const targetInfo: TargetInfo = { unit: 'minute', diff: 5 };
            const currentDate = getDayJsDate(getCurrentDate(format.detail));
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit); // 현재 시간에서 5분 후
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit);
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit);

            // Assert
            expect(actualDifference).toBeCloseTo(expectedDifference, 0);
        });

        it('should calculate the difference in hours correctly', () => {
            // Arrange
            const targetInfo: TargetInfo = { unit: 'hour', diff: 3 };
            const currentDate = getDayJsDate(getCurrentDate(format.detail));
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit); // 현재 시간에서 3시간 후
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit);
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit);

            // Assert
            expect(actualDifference).toBeCloseTo(expectedDifference, 0);
        });

        it('should calculate the difference in days correctly', () => {
            // Arrange
            const targetInfo: TargetInfo = { unit: 'day', diff: 10 };
            const currentDate = getDayJsDate(getCurrentDate(format.detail));
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit); // 현재 시간에서 10일 후
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit);
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit);

            // Assert
            expect(actualDifference).toBeCloseTo(expectedDifference, 0);
        });

        it('should calculate the difference in months correctly', () => {
            // Arrange
            const targetInfo: TargetInfo = { unit: 'month', diff: 3 };
            const currentDate = getDayJsDate(getCurrentDate(format.detail));
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit); // 현재 시간에서 3개월 후
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit);
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit);

            // Assert
            expect(actualDifference).toBeCloseTo(expectedDifference, 0);
        });

        it('should calculate the difference in years correctly', () => {
            // Arrange
            const targetInfo: TargetInfo = { unit: 'year', diff: 12 };
            const currentDate = getDayJsDate(getCurrentDate(format.detail));
            const targetDate = dayjs(currentDate).add(targetInfo.diff, targetInfo.unit); // 현재 시간에서 12년 후
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit);
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit);

            // Assert
            expect(actualDifference).toBeCloseTo(expectedDifference, 0);
        });

        it('should return a negative difference for past dates in seconds', () => {
            // Arrange
            const targetInfo: TargetInfo = { unit: 'second', diff: 10 };
            const currentDate = getDayJsDate(getCurrentDate(format.detail));
            const targetDate = dayjs(currentDate).subtract(targetInfo.diff, targetInfo.unit); // 현재 시간에서 10초 전
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit);
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit);

            // Assert
            expect(actualDifference).toBeCloseTo(expectedDifference, 0);
        });

        it('should return a negative difference for past dates in minutes', () => {
            // Arrange
            const targetInfo: TargetInfo = { unit: 'minute', diff: 2 };
            const currentDate = getDayJsDate(getCurrentDate(format.detail));
            const targetDate = dayjs(currentDate).subtract(targetInfo.diff, targetInfo.unit); // 현재 시간에서 2분 전
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit);
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit);

            // Assert
            expect(actualDifference).toBeCloseTo(expectedDifference, 0);
        });

        it('should return a negative difference for past dates in hours', () => {
            // Arrange
            const targetInfo: TargetInfo = { unit: 'hour', diff: 1 };
            const currentDate = getDayJsDate(getCurrentDate(format.detail));
            const targetDate = dayjs(currentDate).subtract(targetInfo.diff, targetInfo.unit); // 현재 시간에서 1시간 전
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit);
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit);

            // Assert
            expect(actualDifference).toBeCloseTo(expectedDifference, 0);
        });

        it('should return a negative difference for past dates in days', () => {
            // Arrange
            const targetInfo: TargetInfo = { unit: 'day', diff: 5 };
            const currentDate = getDayJsDate(getCurrentDate(format.detail));
            const targetDate = dayjs(currentDate).subtract(targetInfo.diff, targetInfo.unit); // 현재 시간에서 5일 전
            const expectedDifference = currentDate.diff(targetDate, targetInfo.unit);
            const actualDifference = calcCurrentDateDifference(targetDate.toISOString(), targetInfo.unit);

            // Assert
            expect(actualDifference).toBeCloseTo(expectedDifference, 0);
        });
    });
});
