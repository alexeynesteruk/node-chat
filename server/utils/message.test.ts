import expect from 'expect';

import { Message } from './message';

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Admin';
        const text = 'Test message';

        const textMessage = new Message(from, text);

        expect(textMessage).toMatchObject({ from, text });
        expect(typeof textMessage.createAt).toBe('number');
    })
})