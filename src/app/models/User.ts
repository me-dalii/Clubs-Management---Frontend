import { Gender } from "src/enums/Gender";
import { AbstractEntity } from "./AbstractEntity";
import { Account } from "./Account";
import { Club } from "./Club";
import { Grade } from "./Grade";

export interface User extends AbstractEntity{
    firstName? : string;
    lastName? : string;
    cin? : string;
    email? : string;
    phone? : string;
    dob? : Date;
    gender? : Gender;

    account? : Account;
    grade? : Grade;
    club?: Club;
}