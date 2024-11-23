import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';

// export const baseUrl = 'http://143.198.186.60';
// export const baseUrl = 'http://192.168.1.58';
export const baseUrl = 'http://192.168.89.222';
const weatherAPIUrl = 'https://api.openweathermap.org/data/2.5/weather'

export const baseApiUrlContacts = `${baseUrl}:3004/api/v1/`;

const axiosInstanceBack: AxiosInstance = axios.create({
    baseURL: baseApiUrlContacts,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstanceBack.interceptors.request.use(
    async (config) => {
      const token = AsyncStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const axiosInstanceWeather: AxiosInstance = axios.create({
    baseURL: weatherAPIUrl,
    timeout: 10000,
});

export {axiosInstanceBack, axiosInstanceWeather };