import React, { useEffect, useState } from 'react';
import MapView, { LatLng, MapPressEvent, Marker, Region } from 'react-native-maps';
import { View, Button, StyleSheet, Modal, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface MapPickerProps {
  onLocationSelected: (coords: LatLng) => void;
  isVisible: boolean;
  onClose: () => void;
  latitudeContact?: number;
  longitudeContact?: number;
}

const MapPickerComponent: React.FC<MapPickerProps> = ({ onLocationSelected, isVisible, onClose, latitudeContact, longitudeContact }) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | undefined>(
    latitudeContact && longitudeContact
      ? { latitude: latitudeContact, longitude: longitudeContact }
      : undefined
  );
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(
    latitudeContact && longitudeContact
      ? {
          latitude: latitudeContact,
          longitude: longitudeContact,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      : undefined
  );

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      if (!latitudeContact || !longitudeContact) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setInitialRegion({
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          },
          (error) => {
            Alert.alert("Error al obtener la ubicación", error.message);
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 30000 }
        );
      } 
      // else {
      //   setInitialRegion({
      //     latitude: latitudeContact,
      //     longitude: longitudeContact,
      //     latitudeDelta: 0.01,
      //     longitudeDelta: 0.01,
      //   });
      // }
    };

    if (isVisible && !selectedLocation) {
      fetchCurrentLocation();
    }
  }, [isVisible, latitudeContact, longitudeContact]);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {initialRegion ? (
            <MapView
              style={styles.map}
              region={initialRegion}
              onPress={handleMapPress}
            >
              {selectedLocation && (
                <Marker
                  coordinate={selectedLocation}
                  title="Ubicación seleccionada"
                  description="Esta es la ubicación que seleccionaste"
                />
              )}
            </MapView>
          ) : (
            <View style={styles.loadingContainer}>
              <Button title="Cargando mapa..." disabled />
            </View>
          )}
          <Button title="Guardar Ubicación" onPress={() => selectedLocation && onLocationSelected(selectedLocation)} />
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '90%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapPickerComponent;
