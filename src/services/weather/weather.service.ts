import { IWeather } from "../../interfaces/others/weather.interface";
import { axiosInstanceWeather } from "../../config/axios.config";


const APIKey = process.env.OPEN_WEATHER_API_KEY
console.log("api key", APIKey);

export const getWeather = async (latitud: number, longitude: number): Promise<IWeather | undefined> => {

    try {
        const {data} = await axiosInstanceWeather.get(`?lat=${latitud}&lon=${longitude}&appid=${APIKey}&lang=es&units=metric`)
        return data
    } catch (error: any) {
        console.error("Error gettin weather", error)
    }
    
}
