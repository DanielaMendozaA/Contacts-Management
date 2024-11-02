import axiosInstanceContacts from "../../config/axios.config";
import { TEndpointKeys, CONTACTS_API_ENDPOINTS } from "./contact.endpoint";
import { ICreateContact, IEditContact } from '../../interfaces/contact.interface';
import handleAxiosError from "../../utilities/handle-errors";

const endpoints = (method: TEndpointKeys, id?: string) => {
    return CONTACTS_API_ENDPOINTS(id)[method];
}

export class ContactService {
    static async getAllOrFilter(query?: string) {
        const endpoint = endpoints('GET_ALL_OR_FILTER');

        try {
            const response = await axiosInstanceContacts.get(`${endpoint}?${query && query}`);
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en getAllOrFilter:", errorMessage);
            throw new Error(errorMessage)
        }

    }

    static async create(body: ICreateContact) {
        const endpoint = endpoints('CREATE');
        try {
            const response = await axiosInstanceContacts.post(`${endpoint}`, body);
            return response.data

        } catch (error) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en create:", errorMessage);
            throw new Error(errorMessage)
        }

    }

    static async getById(id: string) {
        const endpoint = endpoints('GET_BY_ID', id);
        try {
            const response = await axiosInstanceContacts.get(endpoint);
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en getById:", errorMessage);
            throw new Error(errorMessage)
        }
    }

    static async updateContact(id: string, body: IEditContact) {
        const endpoint = endpoints('PATCH', id);
        try {
            const updated = await axiosInstanceContacts.patch(endpoint, body)   
            return updated
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            
            console.error("Error en udpate:", errorMessage);
            throw new Error(errorMessage)  
        }

    }

    static async deleteContact(id: string) {
        const endpoint = endpoints('DELETE', id);
        try {
            return await axiosInstanceContacts.delete(endpoint)
        } catch (error) {
            const errorMessage = handleAxiosError(error);

            console.error("Error en getById:", errorMessage);
            throw error;
        }

    }


}