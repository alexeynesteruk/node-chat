import expect from 'expect';
import { User } from './User';

describe('User model', () => {
    it('should create a new User and fill entity', () => {
        const mockId = 'w6187tegatr2163';
        const mockName = 'Alex';
        const mockRoom = 'testRoom';
        const newUser = new User(mockId, mockName, mockRoom);

        expect(newUser.id).toBe(mockId);
        expect(typeof newUser.id).toBe('string');
        expect(newUser.name).toBe(mockName);
        expect(typeof newUser.name).toBe('string');
        expect(newUser.room).toBe(mockRoom);
        expect(typeof newUser.name).toBe('string');
    })
});