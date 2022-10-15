import { AbstractEntity } from "./AbstractEntity";

export interface Role extends AbstractEntity{
    name? : string;
    description? : string;
}