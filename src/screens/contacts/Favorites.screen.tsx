import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomText from '../../components/common/CustomText.component';
import AddContactForm from '../../components/contacts/AddContactsForm.component';

const FavoritesScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(59, 171, 192, 0.32)',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
});

export default FavoritesScreen;
