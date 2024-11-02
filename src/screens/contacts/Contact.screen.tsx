import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import ContactList from '../../components/contacts/ContactList.component';

const ContactsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ContactList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F8EDE3',
    padding: 16,
  },
});

export default ContactsScreen;
