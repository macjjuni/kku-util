import { debounce as lodashDebounce, throttle as lodashThrottle } from 'lodash-es';

type ThrottledFunction<T> = (arg?: T) => void;

const createDebounce = <T>(func: (e?: T) => void, wait: number): ThrottledFunction<T> => {
    return lodashDebounce(func, wait);
};

const createThrottle = <T>(func: (e?: T) => void, wait: number): ThrottledFunction<T> => {
    return lodashThrottle(func, wait);
};

const debounceThrottleUtil = {
    createDebounce,
    createThrottle,
} as const;

export default debounceThrottleUtil;