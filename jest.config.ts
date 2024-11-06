export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: '<rootDir>/tsconfig.json',
            useESM: true, // ESM 지원
        }],
    },
    transformIgnorePatterns: [
        '/node_modules/(?!lodash-es)',  // lodash-es를 변환하도록 예외 처리
    ],
    moduleNameMapper: {
        '^lodash-es$': 'lodash',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // 테스트 제외 경로 추가
    testPathIgnorePatterns: [
        '/node_modules/',
        '/lib/',
    ],
}
