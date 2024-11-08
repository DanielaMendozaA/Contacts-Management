import { axiosInstanceContacts } from "../../config/axios.config";
import { TEndpointKeys, CONTACTS_API_ENDPOINTS } from "./contact.endpoint";
import { IContact, ICreateContact, IEditContact } from '../../interfaces/contact.interface';
import handleAxiosError from "../../utilities/handle-errors";
import { IContactDeleteResponse, IContactResponse, IContactUpdateResponse } from "../../interfaces/contactResponse.interface";

const endpoints = (method: TEndpointKeys, id?: string) => {
    return CONTACTS_API_ENDPOINTS(id)[method];
}

export class ContactService {
    static async getAllOrFilter(query?: string): Promise<IContactResponse> {
        const endpoint = endpoints('GET_ALL_OR_FILTER');

        try {
            const response = await axiosInstanceContacts.get<IContactResponse>(`${endpoint}`);
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
            const response = await axiosInstanceContacts.post<IContactResponse>(`${endpoint}`, body);
            return response.data

        } catch (error: any) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en create:", errorMessage);
            throw new Error(JSON.stringify(error.response.data))
        }

    }

    static async getById(id: string) : Promise<IContactResponse> {
        const endpoint = endpoints('GET_BY_ID', id);
        try {
            const response = await axiosInstanceContacts.get<IContactResponse>(endpoint);
            console.log("respuesta desde getById",  response.data);
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en getById:", errorMessage);
            throw new Error(errorMessage)
        }
    }

    static async updateContact(id: string, body: IEditContact) : Promise<IContactUpdateResponse> {
        const endpoint = endpoints('PATCH', id);
        try {
            const updated = await axiosInstanceContacts.patch<IContactUpdateResponse>(endpoint, body)
            console.log("contacto editado",updated);
            
            return updated.data
        } catch (error) {
            const errorMessage = handleAxiosError(error);

            console.error("Error en udpate:", errorMessage);
            throw new Error(errorMessage)
        }

    }

    static async deleteContact(id: string): Promise<IContactDeleteResponse> {
        const endpoint = endpoints('DELETE', id);
        try {
            const deleteContact = await axiosInstanceContacts.delete<IContactDeleteResponse>(endpoint)
            return deleteContact.data
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            console.error("Error en getById:", errorMessage);
            throw error;
        }

    }


}