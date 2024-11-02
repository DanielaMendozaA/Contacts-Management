// src/components/contacts/EditContactModal.component.tsx
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import useSubmitEditContact from '../../hooks/contacts/useSubmitEditContact';
import { ICreateContact, IEditContact } from '../../interfaces/contact.interface';
import ContactForm from './ContactForm.component';

interface EditContactModalProps {
    visible: boolean;
    onClose: () => void;
    contactId: string;
    contact: ICreateContact;
}

const EditContactModal: React.FC<EditContactModalProps> = ({ visible, onClose, contactId, contact }) => {
    const { submitContact, loading } = useSubmitEditContact();
    
    const onSubmit = (data: Partial<ICreateContact>) => {
        console.log("onsumit photo", data.photo);
        submitContact(contactId, data, () => {
            onClose();
        });
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <ContactForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={{
                        name: contact.name,
                        email: contact.email,
                        phone: contact.phone,
                        photo: contact.photo
                    }}
                    buttonText="Guardar Cambios"
                />
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});

export default EditContactModal;
