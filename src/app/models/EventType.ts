import { AbstractEntity } from "./AbstractEntity";
import { Event } from "./Event";

export interface EventType extends AbstractEntity{
    title? : string;
    description? : string;
    events? : Event[]

}