import {stringUtil} from '@/index';

const {isNumber, extractStringNumber, comma, getUuid} = stringUtil;

describe('string util test', () => {

    describe('isNumber', () => {

        it('should return true when the target is a number', () => {
            // Arrange
            const targetStr = 123456789;
            const expectData = isNumber(targetStr);

            // Assert
            expect(expectData).toBeTruthy();
        });

        it('should return true when the target string contains only numeric characters', () => {
            // Arrange
            const targetStr = '123123213';
            const expectData = isNumber(targetStr);

            // Assert
            expect(expectData).toBeTruthy();
        });

        it('should return false for non-numeric strings', () => {
            // Arrange
            const targetStr = '123123213abc';
            const expectData = isNumber(targetStr);

            // Assert
            expect(expectData).not.toBeTruthy();
        });
    });

    describe('extractNumber', () => {

        it('should extract only the number from a mixed string', () => {
            // Arrange
            const targetStrNum = '123456789';
            const targetOnlyStr = 'abc';
            const expectData = extractStringNumber(`${targetStrNum}${targetOnlyStr}`);

            // Assert
            expect(expectData).toBe(targetStrNum);
        });
    });

    describe('comma', () => {

        it('should format the number with commas every three digits', () => {
            // Arrange
            const targetNum = 123456789;
            const expectData = comma(targetNum);

            // Assert
            expect(expectData).toBe('123,456,789');
        });

        it('should format the number with commas every three digits', () => {
            // Arrange
            const targetNum = -777777;
            const expectData = comma(targetNum);

            // Assert
            expect(expectData).toBe('-777,777');
        });
    });

    describe('getUuid', () => {

        it('should generate a valid UUID', () => {
            // Arrange
            const expectData = getUuid();

            // Assert
            expect(expectData).toBeTruthy();
        });
    });
});
