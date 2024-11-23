import { ContactCategoty } from "../../enums/category.enum";
import { IUser } from "../users/user.interface";

export interface ICreateContact {
    name: string;
    email: string;
    phone: number;
    category: ContactCategoty;
    photo?: string;
    latitude?: number;
    longitude?: number;
    idContactFromDevice?: string;
    user: Partial<IUser>
 
}

export interface IContact {
    id: number;
    name: string;
    email: string;
    phone: number;
    category: ContactCategoty;
    photo?: string;
    latitude?: number;
    longitude?: number;
    idContactFromDevice?: string
    createdBy?: null;
    updatedBy?: null;
    deletedBy?: null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: null;
    user:  Partial<IUser>
};

export interface IEditContact {
    name?: string;
    email?: string;
    phone?: number;
    photo?: string;
    category: ContactCategoty;
    latitude?: number;
    longitude?: number;
}

