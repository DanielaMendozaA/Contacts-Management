import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import CustomText from './CustomText.component';
import CustomButton from "./CustomTextTouchable.component";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    text: string;
}

export const CustomModalConfirmComponent: React.FC<ModalProps> = ({
    visible,
    onClose,
    text
}) => {
    return (
        <Modal
            transparent={true} 
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}> 
                <View style={styles.containerModal}>
                    <CustomText style={styles.text}>
                        {text}
                    </CustomText>

                    <CustomButton
                        title="Cerrar"
                        onPress={onClose}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    containerModal: {
        width: '80%',
        backgroundColor: '#F8EDE3',
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    text: {
        color: '#040a5d',
        fontSize: 25,
        textAlign: "center"
    }
});
