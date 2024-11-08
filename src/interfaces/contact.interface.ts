import { ContactCategoty } from "../enums/category.enum";

export interface ICreateContact {
    name: string;
    email: string;
    phone: string;
    category: ContactCategoty;
    photo?: string;
    latitude?: number;
    longitude?: number;
}

export interface IContact {
    id: number;
    name: string;
    email: string;
    phone: string;
    category: ContactCategoty;
    photo?: string;
    latitude?: number;
    longitude?: number;
};

export interface IEditContact {
    name?: string;
    email?: string;
    phone?: string;
    photo?: string;
    category?: ContactCategoty;
    latitude?: number;
    longitude?: number;
}

