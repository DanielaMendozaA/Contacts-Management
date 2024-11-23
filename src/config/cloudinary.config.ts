import axios from 'axios';
import { baseUrl } from './axios.config';

const BACKEND_URL = `${baseUrl}:3004/api/v1/cloudinary/upload`

export const uploadImageToCloudinary = async (photoUri: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: photoUri,
    type: 'image/jpeg', 
    name: `photo_${Date.now()}.jpg`,
  });

  try {
    const response = await axios.post(BACKEND_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log("Respuesta desde el backend", response);

    console.log("response data secure -----", response.data.data.secure_url);
    

    return response.data.data.secure_url;
  } catch (error) {
    console.error('Error uploading image to the backend:', error);
    throw error;
  }
};
