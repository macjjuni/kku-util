import 'dayjs/locale/ko';
import dayjs from 'dayjs';

type DateType = Date | string | number;
type CalculateUnitType = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

dayjs.locale('ko'); // initialize Locate

const formatConfig = {
    default: 'YYYY.MM.DD',
    detail: 'YYYY-MM-DD HH:mm:ss',
};

function getDayJsDate(date: DateType) {
    const dateObj = dayjs(date);
    if (!dateObj.isValid()){
        throw Error("Invalid date.");
    }
    return dateObj;
}

function getCurrentDate(format?: string) {
    return dayjs().format(format || formatConfig.detail);
}

function getFormatDate(date: DateType, format?: string) {
    return getDayJsDate(date).format(format || formatConfig.default);
}

function calcDate(date: DateType, amount: number, unit: CalculateUnitType = 'day', format?: string) {
    const calculatedDate = getDayJsDate(date).add(amount, unit);
    return calculatedDate.format(format);
}

function calcCurrentDateDifference(date: DateType, unit: CalculateUnitType) {
    const currentDate = getCurrentDate(); // 현재 날짜
    const targetDate = getDayJsDate(date); // 목표 날짜

    switch (unit) {
        case 'second':
            return targetDate.diff(currentDate, 'second'); // 초 차이
        case 'minute':
            return targetDate.diff(currentDate, 'minute'); // 분 차이
        case 'hour':
            return targetDate.diff(currentDate, 'hour'); // 시간 차이
        case 'day':
            return targetDate.diff(currentDate, 'day'); // 일 차이
        case 'month':
            return targetDate.diff(currentDate, 'month'); // 월 차이
        case 'year':
            return targetDate.diff(currentDate, 'year'); // 연 차이
        default:
            throw new Error('Invalid unit specified'); // 에러 처리
    }
}


export default {
    formatConfig, getCurrentDate, getFormatDate, calcDate, calcCurrentDateDifference
};
