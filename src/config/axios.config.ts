import axios, { AxiosInstance } from 'axios';

// const baseUrl = 'http://192.168.89.249';
const baseUrl = 'http://192.168.1.58';
const weatherAPIUrl = 'https://api.openweathermap.org/data/2.5/weather'

export const baseApiUrlContacts = `${baseUrl}:3004/api/v1/`;

const axiosInstanceContacts: AxiosInstance = axios.create({
    baseURL: baseApiUrlContacts,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const axiosInstanceWeather: AxiosInstance = axios.create({
    baseURL: weatherAPIUrl,
    timeout: 10000,
});

export {axiosInstanceContacts, axiosInstanceWeather };