import expect from 'expect';
import { User } from './../user/User';
import { UserStore } from './UserStore';

describe('UserStore model', () => {
    let userStore: UserStore;
    let userSet = [{
        id: 'id1',
        name: 'TestUser1',
        room: 'TestRoom1'
    },
    {
        id: 'id2',
        name: 'TestUser2',
        room: 'TestRoom1'
    },
    {
        id: 'id3',
        name: 'TestUser3',
        room: 'TestRoom2'
    }];

    beforeEach(() => {
        userStore = new UserStore();
        userStore.addUser(new User(userSet[0].id, userSet[0].name, userSet[0].room));
        userStore.addUser(new User(userSet[1].id, userSet[1].name, userSet[1].room));
        userStore.addUser(new User(userSet[2].id, userSet[2].name, userSet[2].room));
    });

    it('should create a new User and add to userStore', () => {
        const addedUser = userStore.addUser(new User(userSet[2].id, userSet[2].name, userSet[2].room));

        expect(addedUser.id).toBe(userSet[2].id);
        expect(typeof addedUser.id).toBe('string');

        expect(addedUser.name).toBe(userSet[2].name);
        expect(typeof addedUser.name).toBe('string');

        expect(addedUser.room).toBe(userSet[2].room);
        expect(typeof addedUser.name).toBe('string');
    })

    it('should remove and return User by id', () => {
        const deletedUsee = userStore.removeUser(userSet[0].id);

        expect(deletedUsee.id).toBe(userSet[0].id);
        expect(typeof deletedUsee.id).toBe('string');

        expect(deletedUsee.name).toBe(userSet[0].name);
        expect(typeof deletedUsee.name).toBe('string');

        expect(deletedUsee.room).toBe(userSet[0].room);
        expect(typeof deletedUsee.name).toBe('string');

        expect(userStore.removeUser(userSet[0].id)).toBe(undefined);
    })

    it('should return user names for course',()=>{
        const users = userStore.getUserNameListByRoom('TestRoom1');
        expect(users).toEqual([userSet[0].name,userSet[1].name]);
    });

    it('should return user by id',()=>{
        const user = userStore.getUser(userSet[0].id);
        expect(user).toEqual(userSet[0]);
    });

    it('should return user by invalid id',()=>{
        const user = userStore.getUser('askjdhkjhwbqnm');
        expect(user).toBe(undefined);
    });

    it('should remove user by valid id',()=>{
        let user = userStore.removeUser(userSet[0].id);
        expect(user).toEqual(userSet[0]);

        user = userStore.getUser(userSet[0].id);
        expect(user).toBe(undefined);
    })

    it('should not remove user by invalid id',()=>{
        let user = userStore.removeUser('askjdhkjhwbqnm');
        expect(user).toBe(undefined);

        user = userStore.getUser(userSet[0].id);
        expect(user).toEqual(userSet[0]);
    })

});