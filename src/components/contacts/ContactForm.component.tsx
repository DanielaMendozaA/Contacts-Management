import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import CustomText from '../common/CustomText.component';
import ImagePickerComponent from '../others/ImagePickerComponent';
import CustomButton from '../common/CustomTextTouchable.component';
import CustomControllerInput from '../common/CustomControllerInput.component';

const schema = yup.object().shape({
  email: yup.string().email('El correo electrónico es inválido').required('Correo electrónico es requerido'),
  name: yup.string().required('El nombre es requerido'),
  phone: yup.string().required('El teléfono es requerido'),
  photo: yup.string().optional(),
});

interface ContactFormProps {
  defaultValues?: { name: string; email: string; phone: string; photo?: string };
  onSubmit: (data: any) => void;
  loading: boolean;
  buttonText: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ defaultValues, onSubmit, loading, buttonText }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {}
  });

  const handleImageSelected = (imageUrl: string) => {
    setValue('photo', imageUrl);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.containerForm}>
      <View style={styles.containerPhotoPicker}>
        <CustomText style={styles.title}>Seleccionar Foto</CustomText>
        <ImagePickerComponent onImageSelected={handleImageSelected} />
        {errors.photo && <CustomText>{errors.photo.message}</CustomText>}
      </View>
      
      <View style={styles.containerInput}>
        <CustomControllerInput
          control={control}
          name="name"
          placeholder="Ingrese el nombre"
          iconName="people-alt"
          size={20}
          color="rgba(6, 6, 6, 0.7)"
          errors={errors}
        />
        <CustomControllerInput
          control={control}
          name="email"
          placeholder="Ingrese el correo"
          iconName="mail-outline"
          size={20}
          color="rgba(6, 6, 6, 0.7)"
          errors={errors}
        />
        <CustomControllerInput
          control={control}
          name="phone"
          placeholder="Ingrese el teléfono"
          iconName="phone-iphone"
          size={20}
          color="rgba(6, 6, 6, 0.7)"
          errors={errors}
        />
      </View>

      <CustomButton title={buttonText} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    gap: 15,
    padding: 10,
  },
  containerPhotoPicker: {
    backgroundColor: 'rgba(13, 13, 14, 0.87)',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    paddingBottom: 25,
  },
  containerInput: {
    gap: 20,
  },
});

export default ContactForm;
