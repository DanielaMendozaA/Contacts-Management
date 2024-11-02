import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ContactDetailScreenRouteProp, ContactListScreenNavigationProp } from '../../navigation/types/types';
import CustomText from '../common/CustomText.component';
import { useFetchContactId } from '../../hooks/common/fetch.hook';
import { ContactService } from '../../services/contacts/contact.service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTouchableIcon from '../common/CustomIconTouchable.component';
import EditContactModal from './EditContactModal.component';
import { ensureLocationPermission } from '../../utilities/permissions';
import MapPickerComponent from '../others/MapPickerComponent';

const ContactDetailComponent: React.FC = () => {
  const navigation = useNavigation<ContactListScreenNavigationProp>();
  const route = useRoute<ContactDetailScreenRouteProp>();
  const { contactId } = route.params;
  const [favorite, setFavorite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [contactLocation, setContactLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  const handleLocationAccess = async () => {
    const hasPermission = await ensureLocationPermission();

    if (hasPermission) {
      setIsMapVisible(true);
    } else {
      Alert.alert(
        "Permiso Denegado",
        "No se pudo obtener el permiso de ubicación. Por favor, actívalo en Configuración."
      );
    }
  }

  const saveContactLocation = async (coords: { latitude: number; longitude: number }) => {
    try {
      await ContactService.updateContact(contactId, coords);
      console.log(coords);
      
      setContactLocation(coords);
      setIsMapVisible(false);
      Alert.alert("Ubicación guardada correctamente.");
    } catch (error) {
      console.error("Error al guardar la ubicación:", error);
      Alert.alert("Error al guardar la ubicación.");
    }
  };

  const { data, loading, error, refetch } = useFetchContactId(() => ContactService.getById(contactId), [contactId]);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    refetch();
  };

  const deleteContact = () => {
    ContactService.deleteContact(contactId);
    navigation.navigate('ContactList');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <CustomText>Error: {error}</CustomText>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerPhoto}>
        <View style={styles.containerIcons}>
          <CustomTouchableIcon iconName={favorite ? 'star' : 'star-outline'} onPress={toggleFavorite} size={35} />
          <CustomTouchableIcon iconName="edit" onPress={openModal} size={35} />
          <CustomTouchableIcon iconName="delete-outline" onPress={deleteContact} size={35} />
        </View>
        <Image source={{ uri: data.photo }} style={styles.photo} resizeMode="cover" />
        <CustomText style={styles.name}>{data.name}</CustomText>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <CustomText style={styles.infoLabel}>Teléfono</CustomText>
          <CustomText style={styles.infoText}>{data.phone}</CustomText>
        </View>
        <Icon name="phone" size={24} color="#795757" />
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <CustomText style={styles.infoLabel}>Correo Electrónico</CustomText>
          <CustomText style={styles.infoText}>{data.email}</CustomText>
        </View>
        <Icon name="email" size={24} color="#795757" />
      </View>

      <Button title="Acceder a la Ubicación" onPress={handleLocationAccess} />
      
      <MapPickerComponent 
        isVisible={isMapVisible} 
        onLocationSelected={saveContactLocation} 
        onClose={() => setIsMapVisible(false)} 
      />

      <EditContactModal contactId={contactId} visible={isModalVisible} onClose={closeModal} contact={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8EDE3',
    height: 600,
  },
  containerPhoto: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#795757',
    padding: 20,
  },
  containerIcons: {
    flexDirection: 'row',
    alignSelf: 'auto',
    gap: 50,
    paddingBottom: 18,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  infoRow: {
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoBox: {
    marginLeft: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  infoLabel: {
    fontSize: 18,
    color: '#888',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(12, 13, 13, 0.77)',
  },
});

export default ContactDetailComponent;
