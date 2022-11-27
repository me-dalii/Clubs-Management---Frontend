import { AbstractEntity } from "./AbstractEntity";
import { Club } from "./Club";

export interface Teacher extends AbstractEntity{
    firstName? : string;
    lastName? : string;
    cin? : string;
    email? : string;
    phone? : string;
    dob? : Date;

    club? : Club;

}