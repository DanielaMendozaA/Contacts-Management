import React, { useState } from 'react';
import { LatLng } from 'react-native-maps';

import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet } from 'react-native';

import useSubmitEditContact from '../../hooks/contacts/useSubmitEditContact';
import { ICreateContact, IEditContact } from '../../interfaces/contact.interface';
import ContactForm from './ContactForm.component';
import CustomTouchableIcon from '../common/CustomIconTouchable.component';
import CustomButton from '../common/CustomTextTouchable.component';

interface EditContactModalProps {
    visible: boolean;
    onClose: () => void;
    contactId: string;
    contact: ICreateContact;
}

const EditContactModal: React.FC<EditContactModalProps> = ({ visible, onClose, contactId, contact }) => {
    const { submitContact, loading } = useSubmitEditContact();
    const [location, setLocation] = useState<LatLng | null>(null)

    const handleSaveLocation = (coords: LatLng) => {
        setLocation(coords)
    }

    
    const onSubmit = (formData: IEditContact) => {
        console.log("Formulario enviado desde EditContactModal:", formData);

        try {
        
            if (location) {
                formData.latitude = location.latitude;
                formData.longitude = location.longitude;
            }
            
            submitContact(contactId, formData, () => {
                onClose(); 
            });
        } catch (error) {
            Alert.alert("hubo un error")
            console.log(error);
            
        }
  
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose} >

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} >
                <ScrollView contentContainerStyle={styles.modalView}>
                    <CustomTouchableIcon
                        iconName="close"
                        size={40}
                        color="#C57D05"
                        style={styles.closeButton}
                        onPress={onClose} />
                    <ContactForm
                        onSubmit={onSubmit}
                        loading={loading}
                        defaultValues={{
                            name: contact.name,
                            email: contact.email,
                            phone: contact.phone,
                            photo: contact.photo,
                            category: contact.category
                        }}
                        buttonText="Guardar Cambios"
                        onSaveLocation={handleSaveLocation}
                        latitudeContactForm={contact.latitude}
                        longitudeContactForm={contact.longitude}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modalView: {
        backgroundColor: '#F8EDE3',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    closeButton: {
        left: "42%",
    },
});

export default EditContactModal;
