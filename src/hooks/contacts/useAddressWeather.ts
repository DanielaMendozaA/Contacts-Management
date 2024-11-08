import { useState, useEffect } from "react";
import { getWeather } from "../../services/weather/weather.service";

const useAddressWeather = (latitude: number, longitude: number) => {
    const [weather, setWeather] = useState<any>(null);
  
    useEffect(() => {
      console.log('Latitude or Longitude changed:', latitude, longitude);
      const fetchWeatherData = async () => {
        if (latitude && longitude) {
          try {
            const weatherData = await getWeather(latitude, longitude);
            if (weatherData !== weather) {
              setWeather(weatherData);
            }
          } catch (error) {
            console.error('Error fetching weather:', error);
            if (weather !== null) {
              setWeather(null);
            }
          }
        }
      };
  
      fetchWeatherData();
    }, [latitude, longitude]);
  
   
  
    return { weather } ;
  };
  

  export default useAddressWeather;