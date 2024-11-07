import {debounceThrottleUtil} from '../src';

const {createThrottle, createDebounce} = debounceThrottleUtil;

describe('debounceThrottle', () => {
    let mockFunc: jest.Mock;

    beforeEach(() => {
        jest.useFakeTimers();  // 각 테스트 전에 가짜 타이머로 설정
        mockFunc = jest.fn();  // 매번 새로운 mock 함수 생성
    });

    afterEach(() => {
        jest.useRealTimers();  // 각 테스트 후에 실제 타이머로 복원
        jest.clearAllMocks();  // 모킹된 함수 초기화
    });

    describe('createDebounce', () => {

        it('should debounce the function call', () => {
            // Arrange
            const debouncedFunc = createDebounce(mockFunc, 1000);

            debouncedFunc();
            debouncedFunc();
            debouncedFunc();

            expect(mockFunc).not.toBeCalled(); // 아직 함수가 호출되지 않아야 함
            jest.advanceTimersByTime(1000); // 1초 경과

            // Assert
            expect(mockFunc).toBeCalledTimes(1); // 함수가 한 번만 호출되었는지 확인
            jest.useRealTimers();  // 타이머 복원
        });

        it('should pass the correct arguments to the debounced function', () => {
            // Arrange
            const mockFunc = jest.fn();
            const debouncedFunc = createDebounce(mockFunc, 500);

            debouncedFunc('test');
            jest.advanceTimersByTime(500);

            // Assert
            expect(mockFunc).toBeCalledWith('test');
        });
    });

    describe('createThrottle', () => {
        it('should throttle the function call', () => {
            // Arrange
            const mockFunc = jest.fn();
            const throttledFunc = createThrottle(mockFunc, 1000);

            // 여러 번 실행
            throttledFunc();
            throttledFunc();
            throttledFunc();

            // Assert
            expect(mockFunc).toBeCalledTimes(1);

            jest.advanceTimersByTime(500);
            throttledFunc();

            // Assert
            expect(mockFunc).toBeCalledTimes(1);

            jest.advanceTimersByTime(500);
            throttledFunc();

            // Assert
            expect(mockFunc).toBeCalledTimes(2);
        });

        it('should pass the correct arguments to the throttled function', () => {
            // Arrange
            const mockFunc = jest.fn();
            const throttledFunc = createThrottle(mockFunc, 1000);

            throttledFunc('test');
            jest.advanceTimersByTime(1000);

            // Assert
            expect(mockFunc).toBeCalledWith('test');
        });
    });
});
