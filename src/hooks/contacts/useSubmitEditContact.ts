import { useState } from 'react';
import { IEditContact } from '../../interfaces/contact.interface';
import { ContactService } from '../../services/contacts/contact.service';

const useSubmitEditContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (contactId: string, data: IEditContact, onSuccess: () => void) => {
    setLoading(true);
    setError(null);
    
    try {
      await ContactService.updateContact(contactId, data);      
      onSuccess(); 
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al actualizar contacto');
    } finally {
      setLoading(false);
    }
  };

  return { submitContact, loading, error };
};

export default useSubmitEditContact;
