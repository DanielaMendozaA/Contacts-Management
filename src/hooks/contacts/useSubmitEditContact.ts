import { useState } from 'react';
import { ContactService } from '../../services/contacts/contact.service';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { editContact } from '../../redux/features/contactSlice';
import { IContact, IEditContact } from '../../interfaces/contacts/contact.interface';

const useSubmitEditContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const submitContact = async (contactId: number, data: IEditContact, onSuccess: () => void) => {
    setLoading(true);
    setError(null);
    
    try {
      await ContactService.updateContact(contactId, data);
      const editedContact = {
        id: contactId,
        ...data
      }
      dispatch(editContact(editedContact as IContact));
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