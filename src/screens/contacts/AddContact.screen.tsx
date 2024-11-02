import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AddContactForm from '../../components/contacts/AddContactsForm.component';

const AddContactsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <AddContactForm/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EDE3',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
});

export default AddContactsScreen;
