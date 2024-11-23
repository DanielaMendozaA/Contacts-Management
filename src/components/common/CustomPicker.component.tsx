import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

interface ContactPickerProps {
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
}

const ContactPicker: React.FC<ContactPickerProps> = ({ selectedCategory, onCategoryChange }) => {
    return (
        <View style={styles.pickerContainer}>
            <Icon name="category" size={24} color='rgb(95, 58, 32)' style={styles.icon} />
            <Picker
                selectedValue={selectedCategory}
                onValueChange={onCategoryChange}
                style={styles.picker}
            >
                
                <Picker.Item label="Categoría" value = '' />
                <Picker.Item label="Cliente" value="cliente" />
                <Picker.Item label="Empleado" value="empleado" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D0B8A8',
        borderRadius: 5,
        padding: 8,
    },
    icon: {
        marginRight: 5,
    },
    picker: {
        flex: 1,
        color: 'rgb(95, 58, 32)'
    },
});

export default ContactPicker;
