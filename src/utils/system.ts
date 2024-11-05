// 브라우저 타입 정의
export type BrowserType =
    | 'Chrome'
    | 'Firefox'
    | 'Safari'
    | 'Internet Explorer'
    | 'Edge'
    | 'Opera'
    | 'Unknown';

// 운영 체제 타입 정의
export type OSType =
    | 'Windows'
    | 'MacOS'
    | 'Linux'
    | 'Android'
    | 'iOS'
    | 'Unknown';


function getBrowser(): BrowserType {
    const {userAgent} = navigator;

    if (/opr|opera/i.test(userAgent)) {
        return 'Opera';
    }
    if (/edg/i.test(userAgent)) {
        return 'Edge';
    }
    if (/chrome|crios/i.test(userAgent)) {
        return 'Chrome';
    }
    if (/firefox|fxios/i.test(userAgent)) {
        return 'Firefox';
    }
    if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
        return 'Safari';
    }
    if (/msie|trident/i.test(userAgent)) {
        return 'Internet Explorer';
    }
    return 'Unknown';
}

export const getOS = (): OSType => {
    const {userAgent} = navigator;

    if (/android/i.test(userAgent)) {
        return 'Android';
    }
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
        return 'iOS';
    }
    if (/Windows NT/i.test(userAgent)) {
        return 'Windows';
    }
    if (/Macintosh/i.test(userAgent)) {
        return 'MacOS';
    }
    if (/Linux/i.test(userAgent)) {
        return 'Linux';
    }

    return 'Unknown';
};


export default {
    getBrowser, getOS,
};
