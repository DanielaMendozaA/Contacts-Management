import { useState } from 'react';
import { ContactService } from '../../services/contacts/contact.service';
import { ICreateContact } from '../../interfaces/contact.interface';

const useSubmitAddContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (data: ICreateContact, onSuccess: () => void) => {
    setLoading(true);
    setError(null);
    
    const contactData = {
      ...data,
      photo: data.photo || '',
    };

    try {
      const createdContact = await ContactService.create(contactData);      
      
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
