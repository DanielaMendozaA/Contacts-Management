import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LatLng } from 'react-native-maps';
import { ActivityIndicator, View, StyleSheet, Alert } from 'react-native';

import CustomText from '../common/CustomText.component';
import ImagePickerComponent from '../others/ImagePickerComponent';
import CustomButton from '../common/CustomTextTouchable.component';
import CustomControllerInput from '../common/CustomControllerInput.component';
import { ensureLocationPermission } from '../../utilities/permissions';
import MapPickerComponent from '../others/MapPickerComponent';
import CustomTouchableIcon from '../common/CustomIconTouchable.component';
import { Permissions } from '../../enums/permission.enum';
import useContactAdress from '../../hooks/contacts/useContactAddressWeather';
import ContactPicker from '../common/CustomPicker.component';

const schema = yup.object().shape({
  email: yup.string().email('El correo electrónico es inválido').required('Correo electrónico es requerido'),
  name: yup.string().required('El nombre es requerido'),
  phone: yup.string().required('El teléfono es requerido'),
  category: yup.string().required('La categoría es requerida'),
  photo: yup.string().optional(),
});

interface ContactFormProps {
  defaultValues?: { name: string; email: string; phone: string; category: string; photo?: string };
  onSubmit: (data: any) => void;
  loading: boolean;
  buttonText: string;
  onSaveLocation?: (coords: LatLng) => void;
  latitudeContactForm?: number;
  longitudeContactForm?: number;
}

const ContactForm: React.FC<ContactFormProps> = ({
  defaultValues, onSubmit, loading, buttonText, onSaveLocation, latitudeContactForm, longitudeContactForm }) => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('client');
  const [coords, setCoords] = useState<LatLng | null>(
    latitudeContactForm && longitudeContactForm
      ? {
        latitude: latitudeContactForm,
        longitude: longitudeContactForm,
      }
      :
      null
  );
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {}
  });

  useEffect(() => {
    if (defaultValues?.category) {
      console.log("selected categoria", selectedCategory);
      
      setSelectedCategory(defaultValues.category);
      setValue('category', defaultValues.category);
    }
  }, [defaultValues, setValue]);

  const handleLocationAccess = async () => {
    const hasPermissionFine = await ensureLocationPermission(Permissions.ACCESS_FINE_LOCATION)

    if (hasPermissionFine) {
      setIsMapVisible(true);
    } else {
      Alert.alert(
        "Permiso Denegado",
        "No se pudo obtener el permiso de ubicación. Por favor, actívalo en Configuración."
      );
    }
  }

  const handleLocationSelect = (coords: LatLng) => {
    if (onSaveLocation) {
      setCoords(coords)
      onSaveLocation(coords);
    }
    setIsMapVisible(false);
  };

  const { address } = useContactAdress(coords?.latitude || 0, coords?.longitude || 0);

  const handleImageSelected = async (imageUrl: string) => {
    setValue('photo', imageUrl);
  };

  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category)
    setValue('category', category)
    console.log("selected categoria", category);
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.containerForm}>

      <View style={styles.containerPhotoPicker}>
        <CustomText style={styles.title}>Seleccionar Foto</CustomText>
        <ImagePickerComponent onImageSelected={handleImageSelected} />
        {errors.photo && <CustomText>{errors.photo.message}</CustomText>}
      </View>



      <View style={styles.containerInput}>

        <CustomTouchableIcon
          onPress={handleLocationAccess}
          iconName='add-location-alt'
          size={40}
          color='#C57D05'
          text='Seleccionar Ubicación'
        />

        <MapPickerComponent
          isVisible={isMapVisible}
          onLocationSelected={handleLocationSelect}
          onClose={() => setIsMapVisible(false)}
          latitudeContact={latitudeContactForm ? latitudeContactForm : undefined}
          longitudeContact={longitudeContactForm ?
            longitudeContactForm : undefined
          }
        />

        <CustomControllerInput
          control={control}
          name="name"
          placeholder="Ingrese el nombre"
          iconName="people-alt"
          size={20}
          color="rgb(95, 58, 32)"
          errors={errors}
        />
        <CustomControllerInput
          control={control}
          name="email"
          placeholder="Ingrese el correo"
          iconName="mail-outline"
          size={20}
          color="rgb(95, 58, 32)"
          errors={errors}
        />
        <CustomControllerInput
          control={control}
          name="phone"
          placeholder="Ingrese el teléfono"
          iconName="phone-iphone"
          size={20}
          color="rgb(95, 58, 32)"
          errors={errors}
        />
        <ContactPicker
          selectedCategory={selectedCategory}
          onCategoryChange={handleSelectedCategory}
        />

        {coords && address && (
          <View style={styles.containerLocation}>
            <Icon name="location-on" size={40} color="#795757" />
            <CustomText style={styles.locationText}>{address}</CustomText>
          </View>
        )}

      </View>

      <CustomButton title={buttonText} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    gap: 15,
    padding: 10,
  },
  containerPhotoPicker: {
    backgroundColor: 'rgb(95, 58, 32)',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    paddingBottom: 25,
  },
  containerInput: {
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLocation: {
    backgroundColor: '#D0B8A8',
    width: '100%',
    height: 120,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  locationText: {
    flex: 1,
    margin: 10,
    lineHeight: 20,
  },
});

export default ContactForm;
