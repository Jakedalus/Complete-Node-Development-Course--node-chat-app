const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'Jen';
        const text = 'Hello there';
        const message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location message object', () => {
        const from = 'Suzy';
        const latitude = 31.2304;
        const longtitude = 121.4737;
        const url = `https://www.google.com/maps?q=${latitude},${longtitude}`;
        const message = generateLocationMessage(from, latitude, longtitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, url });
    });
});
