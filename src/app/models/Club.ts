import { AbstractEntity } from "./AbstractEntity";
import { CustomFile } from "./CustomFile";
import { Teacher } from "./Teacher";
import { User } from "./User";
import { Event } from "./Event";


export interface Club extends AbstractEntity{
    name? : string;
    description? : string;
    email? : string;


    logo? : CustomFile;
    fsbrequest? : CustomFile;
    ucrequest? : CustomFile;

    leader? : User;
    coordinator? : Teacher;
    events? : Event[];

}