import 'dayjs/locale/ko';
import dayjs from 'dayjs';

type DateType = Date | string | number;
type CalculateUnitType = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

dayjs.locale('ko'); // initialize Locate

const formatConfig = {
    default: 'YYYY.MM.DD',
    detail: 'YYYY-MM-DD HH:mm:ss',
};

function getCurrentDate(format?: string) {
    return dayjs().format(format || formatConfig.detail);
}

function getFormatDate(date: DateType, format?: string) {
    return dayjs(date).format(format || formatConfig.default);
}

function calcDate(date: DateType, amount: number, unit: CalculateUnitType = 'day', format?: string) {
    const calculatedDate = dayjs(date).add(amount, unit);
    return calculatedDate.format(format);
}

// function calcCurrentDateDifference(date: DateType, unit: CalculateUnitType = 'day') {
//     const currentDateTimestamp = dayjs().valueOf();
//     const targetDateTimestamp = dayjs(date).valueOf();
//
//     const differenceInMilliseconds = targetDateTimestamp - currentDateTimestamp;
//
//     switch (unit) {
//         case 'second':
//             return Math.floor(differenceInMilliseconds / 1000); // 초
//         case 'minute':
//             return Math.floor(differenceInMilliseconds / (1000 * 60)); // 분
//         case 'hour':
//             return Math.floor(differenceInMilliseconds / (1000 * 60 * 60)); // 시
//         case 'day':
//             return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)); // 일
//         case 'month':
//             return dayjs(date).diff(dayjs(), 'month'); // 월
//         case 'year':
//             return dayjs(date).diff(dayjs(), 'year'); // 연
//         default:
//             throw new Error('Invalid unit specified'); // 에러
//     }
// };


export default {
    formatConfig, getCurrentDate, getFormatDate, calcDate,
    // calcCurrentDateDifference,
};
