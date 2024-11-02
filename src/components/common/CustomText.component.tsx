import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface CustomTextProps{
    style?: object;
    children?: React.ReactNode;
}

const CustomText:  React.FC<CustomTextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RethinkSans-Regular', 
    fontSize: 16,
    color: 'black'
  },
});

export default CustomText;
