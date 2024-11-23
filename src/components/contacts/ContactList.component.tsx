import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Modal } from 'react-native';
import { useFocusEffect, useNavigation, useNavigationState } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';

import CustomInput from '../common/CustomInput.component';
import CustomText from '../common/CustomText.component';
import { ContactListScreenNavigationProp } from '../../navigation/types/types';
import { usePaginatedContacts } from '../../hooks/common/fetch.hook';


const ContactList: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<ContactListScreenNavigationProp>();
  const [query, setQuery] = useState({
    name: '',
    phone: ''
  });

  const { data: contacts, loading, error, hasMore, loadMore, fetchContacts, handleFirstTime } = usePaginatedContacts(query);

  const detectInputType = (text: string): 'phone' | 'name' => {
    const isPhone = /^[0-9]+$/.test(text);
    return isPhone ? 'phone' : 'name';
  };

  useFocusEffect(
    useCallback(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ animated: false, offset: 0 }); // Lleva el FlatList al inicio
      }
    }, [])
  );


  const handleInputChange = (text: string) => {
    const inputType = detectInputType(text);

    if (inputType === 'phone') {
      setQuery((prevQuery) => ({ ...prevQuery, phone: text, name: '' }));
    } else {
      setQuery((prevQuery) => ({ ...prevQuery, name: text, phone: '' }));
    }
  };

  return (
    <View>
      <CustomInput
        value={query.name || query.phone}
        onChange={(text) => handleInputChange(text)}
        placeholder="Buscar contacto"
        iconName='search'
        size={30}
        color='#795757'
      />

      <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.flatListContent}
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ContactDetail', { contactId: item.id })}>
            <View style={styles.card}>
              {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.photo} resizeMode="cover" />
              ) : (
                <Icon name="account-circle" size={115} style={styles.icon} color="#D0B8A8" />
              )}
              <View style={styles.textContainer}>
                <View style={styles.containerName}>
                  <Icon name="person-pin-circle" size={20} color="#b68869" />
                  <CustomText style={styles.textname}>{item.name}</CustomText>
                </View>
                <View style={styles.containerName}>
                  <Icon name="phone-enabled" size={20} color="#99bab7" />
                  <CustomText style={styles.textname}>{item.phone.toString()}</CustomText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<CustomText>No hay contactos disponibles</CustomText>}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => handleFirstTime()}
        ListFooterComponent={loading && hasMore ? <ActivityIndicator size="large" color="#aaa" /> : null}
        numColumns={2}
        initialScrollIndex={0}
      />
    </View>
  );

}


const { width } = Dimensions.get('window');

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
    width: width / 2 - 15,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    // borderRadius: 20,
    width: "100%",
  },
  icon: {
    width: 115,
    height: 115
  },
  closeButton: {
    left: "42%",
    marginBottom: 15,
  },
  textname: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 14
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  containerName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});

export default ContactList;

