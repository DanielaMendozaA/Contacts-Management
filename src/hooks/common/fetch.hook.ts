import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ContactService } from '../../services/contacts/contact.service';
import { IContact } from '../../interfaces/contacts/contact.interface';
import useDebounce from './useDebouncedFilter.hook';
import { IQueryContact } from '../../services/contacts/contact.endpoint';
import { useFocusEffect } from '@react-navigation/native';


const usePaginatedContacts = (queryContact?: IQueryContact, dependencies: any[] = []) => {
  const [data, setData] = useState<IContact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true); // Maneja la primera carga
  const debouncedQuery = useDebounce(queryContact, 1000);

  const fetchContacts = async (page: number) => {
    const storedUser = await AsyncStorage.getItem("user");
    if (!storedUser) {
      setError("User ID not found");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id;

    setLoading(true);
    try {
      const result = await ContactService.findContactByUserId(userId, 10, page, debouncedQuery);
      const { data: contacts, totalPages } = result.data;

      setData((prevData) => (page === 1 ? contacts : [...prevData, ...contacts]));
      setHasMore(page < totalPages);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore && !isFirstTime) {
      console.log("Cargando más datos para la página:", currentPage + 1);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setIsFirstTime(true); 
    fetchContacts(1);
  }, [debouncedQuery, ...dependencies]);

  const handleFirstTime = useCallback(() => {
    if (isFirstTime) {
      console.log("Primera interacción con la lista. Cambiando estado de isFirstTime.");
      setIsFirstTime(false);
    }
  }, [isFirstTime]);

  useFocusEffect(
    useCallback(() => {
      console.log("Pantalla enfocada. Reseteando estado.");
      setCurrentPage(1);
      setIsFirstTime(true); 
      fetchContacts(1);
    }, [])
  );

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    handleFirstTime, 
    fetchContacts,
  };
};

const useFetchContactId = (contactId: number, dependencies: any[] = []) => {
  const [data, setData] = useState<any | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const existingContact = useSelector((state: RootState) =>
    state.contacts.contacts.find(contact => contact.id === contactId)
  );

  async function fetchData() {
    if (existingContact) {
      setData(existingContact);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await ContactService.getById(contactId);
      setData(result.data);
    } catch (error: any) {
      console.error(error);
      setError(error.message || 'Error fetching data desde aqui');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetchEdit: fetchData };
};


export { usePaginatedContacts, useFetchContactId }
