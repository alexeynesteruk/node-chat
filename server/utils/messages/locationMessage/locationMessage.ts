import { Location } from './location'
import moment from 'moment'

export class LocationMessage {
    from: string;
    location: Location;
    createAt: number;

    constructor(from: string, location: Location) {
        this.from = from;
        this.location = location,
        this.createAt = moment.now();
    }
}