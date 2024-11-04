import {date} from '@/index';
import dayjs from 'dayjs';

const {formatConfig: format, getCurrentDate, getFormatDate, calcDate, calcCurrentDateDifference} = date;

describe('date util test', () => {


    describe('getCurrentNow', () => {

        it('getCurrentNow function returns the current date in the correct format', () => {
            const expectedCurrentDate = dayjs().format(format.detail);
            const currentDate = getCurrentDate(format.detail);

            expect(expectedCurrentDate).toBe(currentDate);
        });

        it('getCurrentNow function with no params returns the current date in the correct format', () => {
            const expectedCurrentDate = dayjs().format(format.detail);
            const currentDate = getCurrentDate();

            expect(expectedCurrentDate).toBe(currentDate);
        });

    });


    describe('getFormatDate', () => {
        it('formats the current date correctly according to the provided format', () => {
            const currentDate = dayjs().format();
            const expectedDate = dayjs(currentDate).format(format.detail);
            const targetDate = getFormatDate(currentDate, format.detail);

            expect(expectedDate).toBe(targetDate);
        });

        it('formats the specific date correctly according to the provided format', () => {
            const specificDate = '2024-12-12';
            const expectedDate = dayjs(specificDate).format(format.default);
            const targetDate = getFormatDate(specificDate, format.default);

            expect(expectedDate).toBe(targetDate);
        });

        it('formats the current date correctly for multiple formats', () => {
            const firstSpecificFormat = 'dddd, MMMM D, YYYY';
            const secondSpecificFormat = 'MM/DD/YYYY';
            const currentDate = dayjs().format();
            const expectedDate1 = dayjs(currentDate).format(firstSpecificFormat);
            const targetDate1 = getFormatDate(currentDate, firstSpecificFormat);
            const expectedDate2 = dayjs(currentDate).format(secondSpecificFormat);
            const targetDate2 = getFormatDate(currentDate, secondSpecificFormat);

            expect(expectedDate1).toBe(targetDate1);
            expect(expectedDate2).toBe(targetDate2);
        });
    });


    describe('calcDate', () => {
        it('should calculate the date correctly by adding days', () => {
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetUnit = 'day';
            const targetAmount = 7;
            const expectedDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);
            const targetDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);

            expect(expectedDate).toBe(targetDate);
        });

        it('should calculate the date correctly by subtracting days', () => {
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetUnit = 'day';
            const targetAmount = -5;
            const expectedDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);
            const targetDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);

            expect(expectedDate).toBe(targetDate);
        });

        it('should calculate the date correctly by adding months', () => {
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetAmount = 2;
            const targetUnit = 'month';
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);

            expect(actualDate).toBe(expectedDate);
        });

        it('should calculate the date correctly by subtracting months', () => {
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetAmount = -3;
            const targetUnit = 'month';
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);

            expect(actualDate).toBe(expectedDate);
        });


        it('should calculate the date correctly by adding years', () => {
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetAmount = 1;
            const targetUnit = 'year';
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);

            expect(actualDate).toBe(expectedDate);
        });

        it('should calculate the date correctly by subtracting years', () => {
            const currentDate = dayjs().format();
            const targetFormat = format.detail;
            const targetAmount = -1;
            const targetUnit = 'year';
            const expectedDate = dayjs(currentDate).add(targetAmount, targetUnit).format(targetFormat);
            const actualDate = calcDate(currentDate, targetAmount, targetUnit, targetFormat);

            expect(actualDate).toBe(expectedDate);
        });
    });

    describe('calcCurrentDateDifference', () => {
        it('should calculate the difference in seconds correctly', () => {
            const targetDate = dayjs().add(30, 'second').toISOString(); // 30초 후
            const expectedDifference = dayjs(targetDate).diff(dayjs(), 'second');
            const actualDifference = calcCurrentDateDifference(targetDate, 'second');

            expect(actualDifference).toBe(expectedDifference);
        });

        it('should calculate the difference in minutes correctly', () => {
            const targetDate = dayjs().add(5, 'minute').toISOString(); // 현재 시간에서 5분 후
            const expectedDifference = dayjs(targetDate).diff(dayjs(), 'minute');
            const actualDifference = calcCurrentDateDifference(targetDate, 'minute');

            expect(actualDifference).toBe(expectedDifference);
        });

        it('should calculate the difference in hours correctly', () => {
            const targetDate = dayjs().add(3, 'hour').toISOString(); // 현재 시간에서 3시간 후
            const expectedDifference = dayjs(targetDate).diff(dayjs(), 'hour');
            const actualDifference = calcCurrentDateDifference(targetDate, 'hour');

            expect(actualDifference).toBe(expectedDifference);
        });

        it('should calculate the difference in days correctly', () => {
            const targetDate = dayjs().add(10, 'day').toISOString(); // 현재 시간에서 10일 후
            const expectedDifference = dayjs(targetDate).diff(dayjs(), 'day');
            const actualDifference = calcCurrentDateDifference(targetDate);

            expect(actualDifference).toBe(expectedDifference);
        });

        it('should calculate the difference in months correctly', () => {
            const targetDate = dayjs().add(2, 'month').toISOString(); // 현재 시간에서 2개월 후
            const expectedDifference = dayjs(targetDate).diff(dayjs(), 'month');
            const actualDifference = calcCurrentDateDifference(targetDate, 'month');

            expect(actualDifference).toBe(expectedDifference);
        });

        it('should calculate the difference in years correctly', () => {
            const targetDate = dayjs().add(12, 'year').toISOString(); // 현재 시간에서 1년 후
            const expectedDifference = dayjs(targetDate).diff(dayjs(), 'year');
            const actualDifference = calcCurrentDateDifference(targetDate, 'year');

            expect(actualDifference).toBe(expectedDifference);
        });

        it('should return a negative difference for past dates in seconds', () => {
            const targetDate = dayjs().subtract(10, 'second').toISOString(); // 현재 시간에서 10초 전
            const expectedDifference = dayjs(targetDate).diff(dayjs(), 'second');
            const actualDifference = calcCurrentDateDifference(targetDate, 'second');

            expect(actualDifference).toBe(expectedDifference);
        });

        it('should return a negative difference for past dates in minutes', () => {
            const targetDate = dayjs().subtract(2, 'minute').toISOString(); // 현재 시간에서 2분 전
            const expectedDifference = dayjs(targetDate).diff(dayjs(), 'minute');
            const actualDifference = calcCurrentDateDifference(targetDate, 'minute');

            expect(actualDifference).toBe(expectedDifference);
        });

        it('should return a negative difference for past dates in hours', () => {
            const targetDate = dayjs().subtract(1, 'hour').toISOString(); // 현재 시간에서 1시간 전
            const expectedDifference = dayjs(targetDate).diff(dayjs(), 'hour');
            const actualDifference = calcCurrentDateDifference(targetDate, 'hour');

            expect(actualDifference).toBe(expectedDifference);
        });

        it('should return a negative difference for past dates in days', () => {
            const targetDate = dayjs().subtract(5, 'day').toISOString(); // 현재 시간에서 5일 전
            const expectedDifference = dayjs(targetDate).diff(dayjs(), 'day');
            const actualDifference = calcCurrentDateDifference(targetDate);

            expect(actualDifference).toBe(expectedDifference);
        });
    });
});
