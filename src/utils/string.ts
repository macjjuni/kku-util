import { v4 as uuidv4 } from "uuid";


function isNumber(value: number | string) {
    const isNumber = typeof value === 'number';
    if (isNumber) {
        return true;
    }
    return /^\d+$/.test(value);
}

function extractStringNumber(str: string) {
    return str.replace(/\D/g, "");
}

function comma(value: number, locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions) {
    return value.toLocaleString(locales, options);
}

function getUuid() {
    return uuidv4();
}



export default {
    isNumber, extractStringNumber, comma, getUuid
}
