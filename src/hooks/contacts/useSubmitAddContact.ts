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
      photo: data.photo || 'https://i.ibb.co/27q4LTW/vectors-3.png',
    };

    try {
      await ContactService.create(contactData);
      onSuccess(); 
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al agregar contacto');
    } finally {
      setLoading(false);
    }
  };

  return { submitContact, loading, error };
};

export default useSubmitAddContact;
