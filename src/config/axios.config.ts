import axios, { AxiosInstance } from 'axios';

// const baseUrl = 'http://192.168.89.165';
const baseUrl = 'http://192.168.1.58';

export const baseApiUrlContacts = `${baseUrl}:3001/`;

const axiosInstanceContacts: AxiosInstance = axios.create({
    baseURL: baseApiUrlContacts,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstanceContacts;