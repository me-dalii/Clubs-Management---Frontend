import { AbstractEntity } from "./AbstractEntity";
import { Club } from "./Club";
import { EventType } from "./EventType";

export interface Event extends AbstractEntity{
    title? : string;
    description? : string;
    place? : string;
    eventDate? : Date;
    endDate? : Date;
    participantsEstimation? : number;

    eventType? : EventType;

    club? : Club;

}