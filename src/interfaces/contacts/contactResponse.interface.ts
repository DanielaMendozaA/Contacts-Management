import { ContactCategoty } from "../../enums/category.enum";
import { IContact } from "./contact.interface";

export interface IContactResponse {
    statusCode: number;
    message: string;
    data: IContact | IContact[]; 
}


export interface IContactUpdateResponse {
    statusCode: number;
    message:    string;
    data:       DataUpdate;
}

export interface DataUpdate {
    generatedMaps: any[];
    raw:           any[];
    affected:      number;
}

export interface IContactDeleteResponse {
    statusCode: number;
    message:    string;
    data:       DataDelete;
}

export interface DataDelete {
    raw:      any[];
    affected: number;
}