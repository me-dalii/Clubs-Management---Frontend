import { AbstractEntity } from "./AbstractEntity";

export interface CustomFile extends AbstractEntity{

    fileName? : string;
    data? : string;

}