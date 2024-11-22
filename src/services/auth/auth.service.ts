import { axiosInstanceBack } from "../../config/axios.config";
import { ILoginResponse } from "../../interfaces/auth/loginResponse.interface";
import { IRegisterResponse } from "../../interfaces/auth/registerResponse.interface";
import { ILoginUser, IRegisterUser } from "../../interfaces/users/user.interface";
import handleAxiosError from "../../utilities/handle-errors";
import { AUTH_API_ENDPOINTS, TEndpointKeys } from "./auth.endpoint";

const endpoints = (method: TEndpointKeys) => {
    return AUTH_API_ENDPOINTS()[method];
}

export class AuthService {
    static async login(body: ILoginUser): Promise<ILoginResponse> {
        const endpoint = endpoints('LOGIN');
        try {
            const response = await axiosInstanceBack.post<ILoginResponse>(`${endpoint}`, body);
            return response.data;

        } catch (error: any) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en login:", errorMessage);
            throw new Error(JSON.stringify(error.response.data));

        }
    }

    static async register(body: IRegisterUser): Promise<IRegisterResponse> {
        const endpoint = endpoints('REGISTER');
        try {
            const response = await axiosInstanceBack.post<IRegisterResponse>(`${endpoint}`, body);
            return response.data;

        } catch (error: any) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en register:", errorMessage);
            throw new Error(JSON.stringify(error.response.data));
        }

    }

}