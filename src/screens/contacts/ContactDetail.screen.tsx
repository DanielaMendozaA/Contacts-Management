import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import ContactDetailComponent from '../../components/contacts/ContactDetalil.component';


const ContactDetailScreen = () => {
    return (
        <SafeAreaView >
            <ContactDetailComponent />
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
        color: 'red'
    },
});

export default ContactDetailScreen;
