import {
    formatDate,
    formatTime12,
    formatTime24,
} from '../utils/formatTimestamp';

describe('Format seconds timestamp to', () => {
    test('Date', () => {
        expect(formatDate(0)).toBe('Jan 01 1970');
        expect(formatDate(86400)).toBe('Jan 02 1970');
        expect(formatDate(1676496318777 / 1000)).toBe('Feb 15 2023');
        expect(formatDate(1456782634)).toBe('Feb 29 2016');
    });

    test('12 hour format', () => {
        expect(formatTime12(0)).toBe('12:00am');
        expect(formatTime12(3600)).toBe('1:00am');
        expect(formatTime12(1676496318777 / 1000)).toBe('9:25pm');
    });

    test('24 hour format', () => {
        expect(formatTime24(0)).toBe('00:00');
        expect(formatTime24(50400)).toBe('14:00');
        expect(formatTime24(1676496318777 / 1000)).toBe('21:25');
    });
});
