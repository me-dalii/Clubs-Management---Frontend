import { AbstractEntity } from "./AbstractEntity";
import { CustomFile } from "./CustomFile";
import { Teacher } from "./Teacher";
import { User } from "./User";

export interface Club extends AbstractEntity{
    name? : string;
    description? : string;
    status? : Boolean;
    email? : string;


    logo? : CustomFile;
    FSBrequest? : CustomFile;
    logUCrequesto? : CustomFile;

    leader? : User;
    coordinator? : Teacher;
    events? : Event[];

}