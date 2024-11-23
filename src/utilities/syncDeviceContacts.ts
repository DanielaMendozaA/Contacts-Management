import { useState, useCallback, useEffect } from 'react';
import { PERMISSIONS } from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ContactService } from '../services/contacts/contact.service';
import { ContactCategoty } from '../enums/category.enum';
import { ensurePermission } from './permissions';
import { clearContacts } from '../redux/features/contactSlice';
import { useFetch } from '../hooks/common/fetch.hook';
import { IContact } from '../interfaces/contacts/contact.interface';


export const useSyncDeviceContacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const [contactsFromDatabase, setContactsFromDatabase] = useState<IContact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await ContactService.getAllOrFilter();
        setContactsFromDatabase(data as IContact[]);
      } catch (error) {
        console.error('Error al obtener los contactos desde la base de datos:', error);
      }
    };

    fetchContacts();
  }, []);

  const syncDeviceContacts = useCallback(async () => {
    setIsLoading(true);

    const hasPermission = await ensurePermission(PERMISSIONS.ANDROID.READ_CONTACTS);
    if (!hasPermission) {
      Alert.alert(
        'Permiso Denegado',
        'No se pudo obtener el permiso de contactos. Por favor, actívalo en Configuración.'
      );
      setIsLoading(false);
      return;
    }

    try {
      const contactsFromDevice = await Contacts.getAll();
      console.log('---------contactos async----------', contactsFromDevice);
      let phoneNumberString: string

      const formattedContacts = contactsFromDevice.map((contact) => {
        if (contact.phoneNumbers.length > 0 && contact.phoneNumbers[0].number) {

          let numberPhone = contact.phoneNumbers[0].number.split(' ');

          if (numberPhone[0].includes('+')) {
            numberPhone.shift();
          }
          phoneNumberString = numberPhone.join(' ').replace(/[^0-9]/g, '');

          console.log("---contact-phone---", phoneNumberString, typeof (phoneNumberString), "----contact-name-----", contact.givenName);

          if (!phoneNumberString) {
            console.log("falso");

          }
        }

        let name = contact.givenName || 'Sin nombre';
        if (name.length < 6) {
          name = 'Ususario' + name 
        }
        console.log(name);
        

        console.log("contacto a subir ----------", {
          idContactFromDevice: contact.recordID,
          name,
          email: contact.emailAddresses?.[0]?.email || 'contacto@correo.com',
          phone: Number(phoneNumberString) || 123456,
          category: ContactCategoty.PENDING,
        });
        
        return {
          idContactFromDevice: contact.recordID,
          name,
          email: contact.emailAddresses?.[0]?.email || 'contacto@correo.com',
          phone: Number(phoneNumberString) || 123456,
          category: ContactCategoty.PENDING,
        }

      });

      console.log("contactos de la base de datos----------", contactsFromDatabase);

      const existingRecordIDs = new Set(
        contactsFromDatabase.map((c) => c.idContactFromDevice)
      );
      const filteredContacts = formattedContacts.filter(
        (contact) => !existingRecordIDs.has(contact.idContactFromDevice)
      );

        console.log('----------contactos filtrados---------------', filteredContacts);

      await Promise.all(
        filteredContacts.map(async (contact) => {
          try {
            await ContactService.create(contact);
            console.log('---contactos creados exitosamente------------');
          } catch (error) {
            console.error('Error subiendo contacto:', contact, error);
          }
        })
      );

      dispatch(clearContacts());

      Alert.alert('Sincronización exitosa', 'Los contactos se han sincronizado.');
    } catch (error) {
      console.error('Error al cargar los contactos:', error);
      Alert.alert('Error', 'No se pudieron cargar los contactos.');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return {
    syncDeviceContacts,
    isLoading,
  };
};
