import { debounceThrottleUtil } from '../src'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

const { createThrottle, createDebounce } = debounceThrottleUtil

describe('debounceThrottle', () => {
    let mockFunc: ReturnType<typeof vi.fn>

    beforeEach(() => {
        vi.useFakeTimers() // fake timer 설정
        mockFunc = vi.fn() // mock 함수 생성
    })

    afterEach(() => {
        vi.useRealTimers() // real timer 복원
        vi.clearAllMocks() // 모든 모킹 초기화
    })

    describe('createDebounce', () => {
        it('should debounce the function call', () => {
            const debouncedFunc = createDebounce(mockFunc, 1000)

            debouncedFunc()
            debouncedFunc()
            debouncedFunc()

            expect(mockFunc).not.toBeCalled() // 아직 호출 안 됨
            vi.advanceTimersByTime(1000) // 1초 경과

            expect(mockFunc).toBeCalledTimes(1) // 딱 1번 호출됨
        })

        it('should pass the correct arguments to the debounced function', () => {
            const debouncedFunc = createDebounce(mockFunc, 500)

            debouncedFunc('test')
            vi.advanceTimersByTime(500)

            expect(mockFunc).toBeCalledWith('test')
        })
    })

    describe('createThrottle', () => {
        it('should throttle the function call', () => {
            const throttledFunc = createThrottle(mockFunc, 1000)

            throttledFunc()
            throttledFunc()
            throttledFunc()

            expect(mockFunc).toBeCalledTimes(1)

            vi.advanceTimersByTime(500)
            throttledFunc()

            expect(mockFunc).toBeCalledTimes(1)

            vi.advanceTimersByTime(500)
            throttledFunc()

            expect(mockFunc).toBeCalledTimes(2)
        })

        it('should pass the correct arguments to the throttled function', () => {
            const throttledFunc = createThrottle(mockFunc, 1000)

            throttledFunc('test')
            vi.advanceTimersByTime(1000)

            expect(mockFunc).toBeCalledWith('test')
        })
    })
})
