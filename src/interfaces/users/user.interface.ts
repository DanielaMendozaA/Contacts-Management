export interface IUser {
    id: string;
    userName: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    createdBy?: string | null;
    updatedBy?: string | null;
    deletedBy?: string | null;
}

export interface IRegisterUser{
    userName: string;
    email: string;
    password: string;
}

export interface ILoginUser{
    email: string;
    password: string;
}