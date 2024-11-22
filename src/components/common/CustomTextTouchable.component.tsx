import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  iconName?: string
  color?: string,
  size?: number,
  style?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, iconName, color, size, style }) => {

  return (

    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {iconName && size &&
        <Icon name={iconName} size={size} color={color || '#C57D05'} />
      }
      <Text style={styles.buttonText}>{title}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#C57D05',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    gap: 20,

  },
  buttonText: {
    color: '#e9e0db',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    backgroundColor: 'red'
  }
});

export default CustomButton;
