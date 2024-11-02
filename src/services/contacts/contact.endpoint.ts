export const CONTACTS_API_ENDPOINTS = (id?: string) => {
    return {
        GET_ALL_OR_FILTER: `contacts`,
        GET_BY_ID: `contacts/${id}`,
        CREATE: `contacts`,
        PATCH: `contacts/${id}`,
        DELETE: `contacts/${id}`
    }
}
export type TEndpointKeys = 'GET_ALL_OR_FILTER' | 'GET_BY_ID' | 'CREATE' | 'PATCH' | 'DELETE';