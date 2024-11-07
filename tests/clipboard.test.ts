// copyToClipboard.test.ts
import {clipboardUtil} from '../src';

const {copyToClipboard} = clipboardUtil;
const testStrText = "test text 123";
const testNumText = 12341234;


describe('copyToClipboard', () => {
    let writeTextMock: jest.SpyInstance;

    beforeAll(() => {
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText: jest.fn() },
            configurable: true,
        });
    });

    beforeEach(() => { // writeText 메서드를 스파이로 설정하여 모킹
        writeTextMock = jest.spyOn(navigator.clipboard, 'writeText');
        writeTextMock.mockResolvedValue(undefined);
        jest.spyOn(console, 'error').mockImplementation(() => {}); // console.error 모킹해서 실행 안되도록
    });

    afterEach(() => { // 테스트 후 모킹 복원
        writeTextMock.mockRestore();
    });

    it('should copy text to clipboard and return true on success', async () => {
        // Arrange
        const expectedResult = await copyToClipboard(testStrText);

        // Assert
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testStrText);
        expect(expectedResult).toBeTruthy();
    });

    it('should copy number to clipboard and return true on success', async () => {
        // Arrange
        const expectedResult = await copyToClipboard(testNumText);
        const targetText = testNumText.toString();

        // Assert
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(targetText);
        expect(expectedResult).toBeTruthy();
    });

    it('should return false if copying fails', async () => {
        // Arrange
        const expectedErrorMsg = "Copy failed";
        writeTextMock.mockRejectedValue(new Error(expectedErrorMsg));

        const result = await copyToClipboard('test text');

        // Assert
        expect(result).toBe(false);
        expect(writeTextMock).toHaveBeenCalledWith('test text'); // 올바른 인자가 전달되었는지 확인
    });
});
