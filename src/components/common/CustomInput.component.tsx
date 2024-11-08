import React from 'react';
import { TextInputProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

interface CustomInputProps{
  value: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  iconName: string;
  size: number;
  color: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ value, onChange, placeholder, iconName, size, color }) => {
  return (
    <Container>
      <StyledIcon name={iconName} size={size} color={color} />
      <StyledTextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="rgb(95, 58, 32)" 
      />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
`;

const StyledIcon = styled(Icon)`
  margin-right: 8px;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  height: 40px;
  color: rgb(95, 58, 32);
`;

export default CustomInput;
