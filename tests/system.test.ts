import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { systemUtil } from '../src'

const { getBrowser, getOS } = systemUtil

describe('systemUtil', () => {
    beforeAll(() => {
        Object.defineProperty(navigator, 'userAgent', { value: '', configurable: true })
    })

    beforeEach(() => {
        Object.defineProperty(navigator, 'userAgent', { value: '', configurable: true })
    })

    describe('getOS', () => {
        it('should return "Windows" for Windows user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value:
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                configurable: true,
            })
            const os = getOS()
            expect(os).toBe('Windows')
        })

        it('should return "MacOS" for Mac user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value:
                  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                configurable: true,
            })
            const os = getOS()
            expect(os).toBe('MacOS')
        })

        it('should return "Linux" for Linux user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value:
                  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                configurable: true,
            })
            const os = getOS()
            expect(os).toBe('Linux')
        })

        it('should return "Android" for Android user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value:
                  'Mozilla/5.0 (Linux; Android 10; Pixel 3 XL Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36',
                configurable: true,
            })
            const os = getOS()
            expect(os).toBe('Android')
        })

        it('should return "iOS" for iOS user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value:
                  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
                configurable: true,
            })
            const os = getOS()
            expect(os).toBe('iOS')
        })

        it('should return "Unknown" for an unknown user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Unknown user agent string',
                configurable: true,
            })
            const os = getOS()
            expect(os).toBe('Unknown')
        })
    })

    describe('getBrowser', () => {
        it('should return "Chrome" for Chrome user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value:
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                configurable: true,
            })
            const browser = getBrowser()
            expect(browser).toBe('Chrome')
        })

        it('should return "Firefox" for Firefox user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
                configurable: true,
            })
            const browser = getBrowser()
            expect(browser).toBe('Firefox')
        })

        it('should return "Safari" for Safari user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value:
                  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
                configurable: true,
            })
            const browser = getBrowser()
            expect(browser).toBe('Safari')
        })

        it('should return "Internet Explorer" for Internet Explorer user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; Trident/7.0; AS; rv:11.0) like Gecko',
                configurable: true,
            })
            const browser = getBrowser()
            expect(browser).toBe('Internet Explorer')
        })

        it('should return "Edge" for Edge user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value:
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.864.41 Safari/537.36 Edg/91.0.864.41',
                configurable: true,
            })
            const browser = getBrowser()
            expect(browser).toBe('Edge')
        })

        it('should return "Opera" for Opera user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value:
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 OPR/77.0.4054.254 Safari/537.36',
                configurable: true,
            })
            const browser = getBrowser()
            expect(browser).toBe('Opera')
        })

        it('should return "Unknown" for an unknown user agent', () => {
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Unknown user agent string',
                configurable: true,
            })
            const browser = getBrowser()
            expect(browser).toBe('Unknown')
        })
    })
})
