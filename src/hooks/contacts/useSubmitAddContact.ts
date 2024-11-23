import { useState } from 'react';
import { ContactService } from '../../services/contacts/contact.service';
import { IContact, ICreateContact } from '../../interfaces/contacts/contact.interface';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/features/contactSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSubmitAddContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const submitContact = async (data: ICreateContact, onSuccess: () => void) => {
    setLoading(true);
    setError(null);

    const user = await AsyncStorage.getItem('user')

    const parsedUser = user ? JSON.parse(user) : null;
    
    if (!parsedUser || !parsedUser.id) {
      throw new Error("El usuario no está disponible en AsyncStorage");
    }
    
    const contactData = {
      ...data,
      photo: data.photo || '',
      userId: parsedUser.id,
    };

    try {
      const createdContact  = await ContactService.create(contactData);
      dispatch(addContact(createdContact.data as IContact));
      console.log("-----contacto creado------", createdContact);
      onSuccess(); 
    } catch (err: any) {
      setError(err.message || JSON.stringify(err) || 'Error al agregar contacto'); 
      setError(err.message || 'Error al agregar contacto');
    } finally {
      setLoading(false);
    }
  };

  return { submitContact, loading, error };
};

export default useSubmitAddContact;
