export interface IRegisterResponse {
    statusCode: number;
    message:    string;
    data:       IData;
}

export interface IData {
    id:       string;
    userName: string;
    email:    string;
}