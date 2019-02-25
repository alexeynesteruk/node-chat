export class User {
    id: string;
    name: string;
    room: string;

    constructor(id: string, name: string, room: string) {
        this.id = id;
        this.name = name;
        this.room = room;
    }
}