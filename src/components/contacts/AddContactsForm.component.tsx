import React from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import CustomText from '../common/CustomText.component';
import useSubmitAddContact from '../../hooks/contacts/useSubmitAddContact';
import ContactForm from './ContactForm.component';



const AddContactForm = () => {
  const { reset } = useForm();

  const { submitContact, loading, error } = useSubmitAddContact();

  const onSubmit = (data: any) => {
    submitContact(data, () => {
      reset();
    });
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
