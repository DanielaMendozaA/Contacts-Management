import React, { useCallback, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CustomInput from '../common/CustomInput.component';
import CustomText from '../common/CustomText.component';
import { ContactListScreenNavigationProp } from '../../navigation/types/types';
import useDebouncedFilter from '../../hooks/common/useDebouncedFilter.hook';
import { useContacts } from '../../context/ContactContext';



const ContactList: React.FC = () => {
  const navigation = useNavigation<ContactListScreenNavigationProp>();
  const [query, setQuery] = useState('');

  const { contacts, loading, error, refetch } = useContacts();
  
  const filteredData = useDebouncedFilter(contacts || [], query, 1000);
  
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );


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
        data={filteredData || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ContactDetail', { contactId: item.id.toString() })}
          >
            <View style={styles.card}>
              {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.photo} resizeMode="cover" />
              ) : (
                <Icon
                name="account-circle"
                size={115}
                style={styles.icon}
                color="#D0B8A8"
              />
              )}
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
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  icon: {
    width: 115,
    height: 115
  },
});

export default ContactList;
