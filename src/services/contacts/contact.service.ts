import { TEndpointKeys, CONTACTS_API_ENDPOINTS, IQueryContact } from "./contact.endpoint";

import handleAxiosError from "../../utilities/handle-errors";
import { IContactDeleteResponse, IContactResponse, IContactUpdateResponse } from "../../interfaces/contacts/contactResponse.interface";
import { IContact, ICreateContact, IEditContact } from "../../interfaces/contacts/contact.interface";
import { axiosInstanceBack } from "../../config/axios.config";
import { PaginatedResponse } from "../../interfaces/others/paginationResponse.interface";

const endpoints = (method: TEndpointKeys, id?: number | string, limit?: number, page?: number, queryContact?: IQueryContact) => {
    return CONTACTS_API_ENDPOINTS(id, limit, page, queryContact)[method];
}

export class ContactService {
    static async getAllOrFilter(query?: string): Promise<IContactResponse> {
        const endpoint = endpoints('GET_ALL_OR_FILTER');

        try {
            const response = await axiosInstanceBack.get<IContactResponse>(`${endpoint}`);
            return response.data;

        } catch (error: any) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en getAllOrFilter:", error);
            throw new Error(errorMessage)
        }

    }

    static async create(body: ICreateContact): Promise<IContactResponse> {
        const endpoint = endpoints('CREATE');
        try {
            const response = await axiosInstanceBack.post<IContactResponse>(`${endpoint}`, body);
            return response.data

        } catch (error: any) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en create:", errorMessage);
            throw new Error(JSON.stringify(error.response.data))
        }

    }

    static async getById(id: number) : Promise<IContactResponse> {
        const endpoint = endpoints('GET_BY_ID', id);
        try {
            const response = await axiosInstanceBack.get<IContactResponse>(endpoint);
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en getById:", errorMessage);
            throw new Error(errorMessage)
        }
    }

    static async updateContact(id: number, body: IEditContact) : Promise<IContactUpdateResponse> {
        const endpoint = endpoints('PATCH', id);
        try {
            const updated = await axiosInstanceBack.patch<IContactUpdateResponse>(endpoint, body)            
            return updated.data
        } catch (error) {
            const errorMessage = handleAxiosError(error);

            console.error("Error en udpate:", errorMessage);
            throw new Error(errorMessage)
        }

    }

    static async deleteContact(id: number): Promise<IContactDeleteResponse> {
        const endpoint = endpoints('DELETE', id);
        try {
            const deleteContact = await axiosInstanceBack.delete<IContactDeleteResponse>(endpoint)
            return deleteContact.data
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en getById:", errorMessage);
            throw error;
        }

    }

    static async findContactByUserId(userId: string, limit = 10, page = 1, queryContact?: IQueryContact): Promise<PaginatedResponse<IContact>>{
        const endpoint = endpoints('GET_CONTACTS_BY_USER_ID', userId, limit, page, queryContact)
        console.log("este es el endpoint", endpoint);
        
        try {
            const response = await axiosInstanceBack.get<PaginatedResponse<IContact>>(`${endpoint}`);            
            return response.data;

        } catch (error) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en getById:", errorMessage);
            throw error;
        }



    }


}