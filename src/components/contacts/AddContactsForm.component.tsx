import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Alert } from 'react-native';
import CustomText from '../common/CustomText.component';
import useSubmitAddContact from '../../hooks/contacts/useSubmitAddContact';
import ContactForm from './ContactForm.component';
import { LatLng } from 'react-native-maps';
import { ICreateContact } from '../../interfaces/contacts/contact.interface';

const AddContactForm = () => {
  const [location, setLocation] = useState<LatLng | null>(null)
  const { reset } = useForm();
  const { submitContact, loading, error } = useSubmitAddContact();


  const handleSaveLocation = (coords: LatLng) => {
    setLocation(coords)
  }


  const onSubmit = (contact: ICreateContact) => {
    try {
      console.log("contact desde el form", contact);
    
      if (location) {
        contact.latitude = location.latitude;
        contact.longitude = location.longitude; 
      }
      submitContact(contact, () => {
        Alert.alert("Contacto creado exitosamente")
        reset();
      });
      
    } catch (error) {
      Alert.alert("hubo un error")
      console.log(error);
    }

  };


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <CustomText>Error: {error}</CustomText>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <ContactForm
          onSubmit={onSubmit}
          loading={loading}
          buttonText="Guardar Cambios"
          onSaveLocation={handleSaveLocation}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
  }
});

export default AddContactForm;