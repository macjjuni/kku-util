import 'dayjs/locale/ko';
import dayjs from 'dayjs';

dayjs.locale('ko'); // initialize Locate

const formatConfig = {
    default: 'YYYY.MM.DD',
    detail: 'YYYY-MM-DD HH:mm',
};

function getCurrentDate(format: string | undefined = formatConfig.detail) {
    return dayjs().format(format);
}




export default {
    formatConfig, getCurrentDate,
};
