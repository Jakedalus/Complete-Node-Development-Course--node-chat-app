const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject nonstring values', () => {
        const str = 1234;

        expect(isRealString(str)).toBe(false);
    });

    it('should reject string with only spaces', () => {
        const str = '        ';

        expect(isRealString(str)).toBe(false);
    });

    it('should allow valid strings', () => {
        const str = '1234';

        expect(isRealString(str)).toBe(true);
    });
})
