import { User } from './../user/User';

export class UserStore {
    private _store: Map<string, User> = new Map();

    addUser(user: User): User {
        this._store.set(user.id, user);
        return user;
    }

    removeUser(userId: string): User {
        if (this._store.has(userId)) {
            const user = this._store.get(userId);
            this._store.delete(userId);
            return user;
        }
        return undefined;
    }

    getUser(userId: string): User {
        return this._store.get(userId);
    }

    getUserNameListByRoom(room: string): string[] {
        const usersInRoom: string[] = [];
        this._store.forEach(user => {
            if (user.room === room)
                usersInRoom.push(user.name);
        })
        return usersInRoom;
    }
}