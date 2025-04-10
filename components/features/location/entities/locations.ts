import { Timestamp } from "firebase/firestore";

export class Location {
    latitude: number;
    longitude: number;
    date:Timestamp;

    constructor(latitude:number,longitude:number,timestamp:Timestamp){
        this.latitude = latitude;
        this.longitude = longitude;
        this.date = timestamp;
    }
}