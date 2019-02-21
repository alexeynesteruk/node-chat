import expect from 'expect';

import { LocationMessage } from './locationMessage';

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
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