import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/du4qblzak/image/upload'; 
const UPLOAD_PRESET = 'contact_photos_upload'; 

export const uploadImageToCloudinary = async (photoUri: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: photoUri,
    type: 'image/jpeg', 
    name: `photo_${Date.now()}.jpg`,
  });
  formData.append('upload_preset', UPLOAD_PRESET);
  console.log("formdata", formData)
  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log("respuesta desde claudinary", response);
    
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};
