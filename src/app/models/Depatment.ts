import { AbstractEntity } from "./AbstractEntity";
import { Grade } from "./Grade";

export interface Department extends AbstractEntity{
    name? : string;
    grades? : Grade[];
}