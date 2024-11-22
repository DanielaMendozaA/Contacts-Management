import React from 'react';
import { Controller, Control, FieldValues, Path, FieldErrors } from 'react-hook-form';

import CustomText from './CustomText.component';
import CustomInput from './CustomInput.component';
import { KeyboardTypeOptions } from 'react-native';

interface CustomControllerInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  iconName: string;
  size: number;
  color: string;
  rules?: object;
  errors?: FieldErrors<T>;
  keyboardType?: KeyboardTypeOptions; 
  secureTextEntry?: boolean;
}

const CustomControllerInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  iconName,
  size,
  color,
  rules,
  errors,
  keyboardType,
  secureTextEntry
}: CustomControllerInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <>
          <CustomInput
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            iconName={iconName}
            size={size}
            color={color}
            keyboardType={keyboardType} 
            secureTextEntry={secureTextEntry} 
          />
          {errors && errors[name] && errors[name]?.message && (
            <CustomText>{String(errors[name]?.message)}</CustomText> 
          )}
        </>
      )}
    />
  );
};

export default CustomControllerInput;
