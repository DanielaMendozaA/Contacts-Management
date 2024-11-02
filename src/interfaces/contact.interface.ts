export interface IContact {
    id: number;
    name: string;
    email: string;
    phone: string;
    photo: string;
    latitude?: number;
    longitude?: number;
};
export interface ICreateContact {
    name: string;
    email: string;
    phone: string;
    photo: string;
    latitude?: number;
    longitude?: number;
}

export interface IContactListProps {
    contacts: ICreateContact[];
};

export interface IEditContact {
    name?: string;
    email?: string;
    phone?: string;
    photo?: string;
    latitude?: number;
    longitude?: number;
}

