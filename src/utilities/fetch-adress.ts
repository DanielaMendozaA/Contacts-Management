import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';

const googleMapsApiKey = Config.GOOGLE_MAPS_API_KEY;

if (googleMapsApiKey) {
  Geocoder.init(googleMapsApiKey);
} else {
  console.error("La clave de API de Google Maps no está definida en las variables de entorno.");
}

const fetchAddressFromCoordinates = async (latitude: number, longitude: number) => {
  try {
    const response = await Geocoder.from(latitude, longitude);
    const address = response.results[0].formatted_address;
    const uniqueWords = address.split(', ')
    const setUniqueWords = [...new Set(uniqueWords)]
    const cleanedAddress = setUniqueWords.join(", ");
    
    return cleanedAddress;
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
    return "Dirección no disponible";
  }
};

export default fetchAddressFromCoordinates;
