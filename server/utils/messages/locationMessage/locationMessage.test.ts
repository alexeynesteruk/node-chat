import expect from 'expect';

import { LocationMessage } from './locationMessage';

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Admin';
        const location = {
            latitude: -1,
            longitude: 1.15454
        }

        const textMessage = new LocationMessage(from, location);

        expect(textMessage).toMatchObject({ from, location });
        expect(textMessage.location).toMatchObject(location);
        expect(typeof textMessage.createAt).toBe('number');
    })
})