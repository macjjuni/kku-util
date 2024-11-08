import 'dayjs/locale/ko';
import dayjs, { type ManipulateType } from 'dayjs';

type DateType = Date | string | number;

dayjs.locale('ko'); // initialize Locate

const formatConfig = {
    default: 'YYYY.MM.DD',
    detail: 'YYYY-MM-DD HH:mm:ss',
};

function getDayJsDate(date: DateType) {
    // 숫자인 경우, 10자리 타임스탬프(초 단위)를 밀리초로 변환
    if (typeof date === 'number' && date.toString().length === 10) {
        date = date * 1000; // 밀리초로 변환
    }

    const dateObj = dayjs(date);
    if (!dateObj.isValid()) {
        throw new Error("Invalid date.");
    }
    return dateObj;
}
function getCurrentDate(format?: string) {
    return dayjs().format(format || formatConfig.detail);
}

function getFormatDate(date: DateType, format?: string) {
    if (typeof date === 'number' && date.toString().length === 10) {
        date = date * 1000;
    }
    return getDayJsDate(date).format(format || formatConfig.default);
}

function convertToTimestamp(date: DateType): number {
    return dayjs(date).valueOf();
}

function calcDate(date: DateType, amount: number, unit: ManipulateType = 'day', format?: string) {
    const calculatedDate = getDayJsDate(date).add(amount, unit);
    return calculatedDate.format(format);
}

function calcCurrentDateDifference(date: DateType, unit: ManipulateType) {
    const currentDate = getDayJsDate(getCurrentDate()); // 현재 날짜
    const targetDate = getDayJsDate(date); // 목표 날짜

    switch (unit) {
        case 'second':
            return currentDate.diff(targetDate, 'second'); // 초 차이
        case 'minute':
            return currentDate.diff(targetDate, 'minute'); // 분 차이
        case 'hour':
            return currentDate.diff(targetDate, 'hour'); // 시간 차이
        case 'day':
            return currentDate.diff(targetDate, 'day'); // 일 차이
        case 'month':
            return currentDate.diff(targetDate, 'month'); // 월 차이
        case 'year':
            return currentDate.diff(targetDate, 'year'); // 연 차이
        default:
            throw new Error('Invalid unit specified'); // 에러 처리
    }
}


export default {
    formatConfig, getDayJsDate, getCurrentDate, getFormatDate, calcDate, calcCurrentDateDifference, convertToTimestamp
};
