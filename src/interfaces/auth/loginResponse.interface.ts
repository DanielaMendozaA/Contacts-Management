export interface ILoginResponse {
    statusCode: number;
    message:    string;
    data:       IData;
}

export interface IData {
    user:  IUser;
    token: string;
}

export interface IUser {
    email: string;
    id:    string;
}