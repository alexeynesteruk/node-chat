export class Message {
    from: string;
    text: string;
    createAt: number;

    constructor(from: string, text: string) {
        this.from = from;
        this.text = text;
        this.createAt = Date.now();
    }
}