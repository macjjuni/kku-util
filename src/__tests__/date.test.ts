import {date} from '@/index';
import dayjs from 'dayjs';

const format = date.formatConfig;


describe('date util test', () => {

    it('getCurrentNow function returns the current date in the correct format', () => {
        const expectedCurrentDate = dayjs().format(format.detail);
        const currentDate = date.getCurrentDate(format.detail);

        expect(expectedCurrentDate).toBe(currentDate);
    });



});
