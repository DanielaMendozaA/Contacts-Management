export interface IQueryContact{
    name?: string
    phone?: string
}



export const CONTACTS_API_ENDPOINTS = (id?: number | string, limit?: number, page?: number, queryContact?: IQueryContact) => {
    return {
        GET_ALL_OR_FILTER: `contacts`,
        GET_BY_ID: `contacts/${id}`,
        CREATE: `contacts`,
        PATCH: `contacts/${id}`,
        DELETE: `contacts/${id}`,
        GET_CONTACTS_BY_USER_ID: `contacts/users?userId=${id}&name=${queryContact?.name || ''}&phone=${queryContact?.phone || ''}&limit=${limit}&page=${page}`
    }
}
export type TEndpointKeys = 'GET_ALL_OR_FILTER' | 'GET_BY_ID' | 'CREATE' | 'PATCH' | 'DELETE' | 'GET_CONTACTS_BY_USER_ID';