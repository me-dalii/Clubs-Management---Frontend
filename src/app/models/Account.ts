import { Role } from "src/enums/Role";
import { AbstractEntity } from "./AbstractEntity";

export interface Account extends AbstractEntity{
    username? : string;
    password? : string;
    role? : Role;
}
