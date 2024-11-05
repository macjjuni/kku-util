import {debounce as lodashDebounce, throttle as lodashThrottle} from 'lodash-es';

const createDebounce = <T>(func: (e?: T) => void, wait: number) => {
    return lodashDebounce(func, wait);
};

const createThrottle = <T>(func: (e?: T) => void, wait: number) => {
    return lodashThrottle(func, wait);
};

export default {createDebounce, createThrottle};
