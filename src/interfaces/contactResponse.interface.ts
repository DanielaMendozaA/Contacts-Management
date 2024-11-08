import { ContactCategoty } from "../enums/category.enum";

export interface IContactResponse {
    statusCode: number;
    message: string;
    data: Data | Data[]; 
}

export interface Data {
    id: number;
    name: string;
    email: string;
    phone:string; 
    category: ContactCategoty;
    photo?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    createdBy?: null;
    updatedBy?: null;
    deletedBy?: null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: null;
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