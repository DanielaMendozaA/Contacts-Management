import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet, ActivityIndicator, Image, ScrollView, Alert, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ContactDetailScreenRouteProp, ContactListScreenNavigationProp } from '../../navigation/types/types';
import CustomText from '../common/CustomText.component';
import { useFetchContactId, usePaginatedContacts } from '../../hooks/common/fetch.hook';
import { ContactService } from '../../services/contacts/contact.service';
import CustomTouchableIcon from '../common/CustomIconTouchable.component';
import EditContactModal from './EditContactModal.component';

import MapView, { Marker } from 'react-native-maps';
import useAddressWeather from '../../hooks/contacts/useAddressWeather';
import useContactAdress from '../../hooks/contacts/useContactAddressWeather';
import CustomButton from '../common/CustomTextTouchable.component';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { removeContact } from '../../redux/features/contactSlice';

const ContactDetailComponent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const navigation = useNavigation<ContactListScreenNavigationProp>();
  const [deleting, setDeleting] = useState(false);
  const route = useRoute<ContactDetailScreenRouteProp>();
  const { contactId } = route.params;
  const { data, loading, error, refetchEdit } = useFetchContactId(contactId);
  const { weather } = useAddressWeather(data.latitude, data.longitude);
  const { address } = useContactAdress(data.latitude, data.longitude);

  console.log("contacto----", data);


  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const {  fetchContacts } = usePaginatedContacts();

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  useEffect(() => {
    refetchEdit();
  }, [isModalVisible]);

  const confirmDelete = async () => {
    try {
      await ContactService.deleteContact(contactId);
      Alert.alert("Usuario Eliminado con Éxito");
      dispatch(removeContact(contactId));
      setIsDeleteModalVisible(false);
      // fetchContacts(1)
      navigation.navigate('ContactList');
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
      Alert.alert("Error al eliminar el contacto");
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
  };


  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <CustomText>Error: {error}</CustomText>;
  }

  const weatherIconCode = weather ? weather.weather[0].icon : null;
  const weatherIconUrl = weatherIconCode
    ? `http://openweathermap.org/img/wn/${weatherIconCode}.png`
    : null;

  if (!data) {
    return <CustomText>No hay datos</CustomText>;
  }

  return (
    // <ScrollView style={styles.container}>

    <ScrollView>


      <View style={styles.containerPhoto}>

        <View style={styles.containerIcons}>
          <CustomTouchableIcon
            iconName={favorite ? 'star' : 'star-outline'}
            onPress={toggleFavorite} size={35}
          />

          <CustomTouchableIcon
            iconName="edit"
            onPress={openModal}
            size={35}
          />
          <CustomTouchableIcon
            iconName="delete-outline"
            onPress={showDeleteModal}
            size={35}
          />

          <Modal
            transparent={true}
            animationType="slide"
            visible={isDeleteModalVisible}
            onRequestClose={cancelDelete}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <CustomText>¿Estás seguro de que deseas eliminar este contacto?</CustomText>
                <View style={styles.buttonContainer}>
                  <CustomButton title="Cancelar" onPress={cancelDelete} />
                  <CustomButton title="Eliminar" onPress={confirmDelete} />
                </View>
              </View>
            </View>
          </Modal>

        </View>

        {data.photo ? (
          <Image source={{ uri: data.photo }} style={styles.photo} resizeMode="cover" />
        ) : (
          <Icon name="account-circle" size={180} color="white" />
        )}

        <CustomText style={styles.name}>{data.name}</CustomText>

        <View style={styles.containerCategory}>
          <Icon
            name={
              data.category === 'cliente' ? 'emoji-people' :
                data.category === 'empleado' ? 'badge' :
                  'pending'
            } size={40} color="rgb(220, 158, 33)" />
          <CustomText style={styles.nameCategory}>{data.category === 'cliente' ? 'Cliente' : 'Empleado'}</CustomText>
        </View>

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


      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <CustomText style={styles.infoLabel}>Ubicación</CustomText>
          <CustomText style={styles.infoText}>{address}</CustomText>
        </View>
        <Icon name="location-on" size={28} color="#795757" />
      </View>

      {weather &&

        <View style={styles.humTem}>

          <View style={styles.temView}>
            <Icon name="thermostat" size={40} color="#512413" style={styles.weatherIconTermHum} />
            <CustomText style={styles.infoText}>
              {weather.main.temp}°C
            </CustomText>
          </View>

          <View style={styles.temView}>
            {weatherIconUrl && <Image source={{ uri: weatherIconUrl }} style={styles.weatherIcon} />}
            <View style={styles.weatherDescriptionContainer}>
              {weather.weather && weather.weather[0].description
                ? weather.weather[0].description.split(' ').map((word: string, index: number) => (
                  <CustomText key={index} style={styles.infoText}>
                    {word}
                  </CustomText>
                ))
                : null}
            </View>
          </View>

          <View style={styles.temView}>
            <Icon name="water-drop" size={40} color="#A2E4F0" style={styles.weatherIconTermHum} />
            <CustomText style={styles.infoText}>
              {weather.main.humidity}%
            </CustomText>
          </View>
        </View>
      }
      {data.longitude && data.latitude ? (

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          liteMode
        >
          <Marker
            coordinate={{
              latitude: Number(data.latitude),
              longitude: Number(data.longitude),
            }}
          />
        </MapView>
      ) : null}

      <EditContactModal contactId={contactId} visible={isModalVisible} onClose={closeModal} contact={data} />
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8EDE3',
    height: 1000,
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
    textAlign: 'center'
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
  weatherIcon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#e88945',
  },
  map: {
    width: "100%",
    height: 200,
  },
  containerWeather: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  humTem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20
  },
  temView: {
    justifyContent: 'center',
    alignItems: 'center'

  },
  weatherIconTermHum: {
    width: 50,
    height: 50,
    padding: 5,
    borderRadius: 40,
    backgroundColor: '#e88945',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherDescriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  containerCategory: {
    // backgroundColor: 'rgb(220, 158, 33)',
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-start',
    borderRadius: 15,
    margin: 15,
    marginTop: 20,
    gap: 5,
    width: '50%'
  },
  nameCategory: {
    color: '#DFD3C3',
    fontSize: 18,
    fontWeight: '300',
  }
});

export default ContactDetailComponent;

