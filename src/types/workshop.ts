import { DanceType } from "./danceTypes";
import { DanceClassLevel } from "./organizer";

export interface Workshop {
    id: string;
    name: string;
    type: DanceType;
    date: string;
    startAt: string;
    endAt: string;
    locate: string;
    level: DanceClassLevel;
    price: string;
    details: string;
    url?: string;
}