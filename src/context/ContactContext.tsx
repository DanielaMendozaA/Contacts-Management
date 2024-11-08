import React, { createContext, useContext, ReactNode } from 'react';
import { IContact } from '../interfaces/contact.interface';
import { ContactService } from '../services/contacts/contact.service';
import { useFetch } from '../hooks/common/fetch.hook';


interface ContactContextType {
  contacts: IContact[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
  const { data: contacts, loading, error, refetch } = useFetch<IContact[]>(() => ContactService.getAllOrFilter());

  return (
    <ContactContext.Provider value={{ contacts, loading, error, refetch }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};
