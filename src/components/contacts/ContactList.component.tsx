import React, { useCallback, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { ContactService } from '../../services/contacts/contact.service';
import CustomInput from '../common/CustomInput.component';
import { IContact } from '../../interfaces/contact.interface'; 
import useDebouncedFilter from '../../hooks/common/useDebouncedFilter.hook';
import CustomText from '../common/CustomText.component';
import {useFetch} from '../../hooks/common/fetch.hook';
import { ContactListScreenNavigationProp } from '../../navigation/types/types';



const ContactList: React.FC = () => {
  const navigation = useNavigation<ContactListScreenNavigationProp>();
  const [query, setQuery] = useState('');
  const { data, loading, error, refetch } = useFetch<IContact[]>(() => ContactService.getAllOrFilter(), []);

  useFocusEffect(
    useCallback(() => {
      refetch(); 
    }, [])
  );

  const filteredData = useDebouncedFilter(data || [], query, 1000);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <CustomText>Error: {error}</CustomText>;
  }

  return (
    <View>
      <CustomInput
        value={query}
        onChange={(text) => setQuery(text)}
        placeholder="Buscar contacto"
        iconName='search'
        size={30}
        color='#795757'
      />
      <FlatList
      contentContainerStyle={styles.flatListContent} //
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ContactDetail', { contactId: item.id.toString() })}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.photo }}
                style={styles.photo}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <CustomText>{item.name}</CustomText>
                <CustomText>{item.phone}</CustomText>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<CustomText>No hay contactos disponibles</CustomText>}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    alignItems: 'center', 
  },
  card: {
    flex: 1,
    padding: 16,
    marginVertical: 8,
    borderRadius: 25,
    alignSelf: 'center',
    width: 130,
  },
  photo: {
    width: 100, 
    height: 100, 
    borderRadius: 50, 
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15
  }
});

export default ContactList;
