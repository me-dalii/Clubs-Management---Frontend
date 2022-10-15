import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Depatment";

export interface Grade extends AbstractEntity{
    title? : string;
    department? : Department;
   
}