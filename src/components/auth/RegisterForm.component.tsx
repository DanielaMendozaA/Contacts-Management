import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomText from '../common/CustomText.component';
import { IRegisterUser } from '../../interfaces/users/user.interface';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../navigation/types/types';
import CustomControllerInput from '../common/CustomControllerInput.component';
import CustomButton from '../common/CustomTextTouchable.component';
import useSubmitRegister from '../../hooks/auth/useSubmitRegisteer';
import { useState } from 'react';
import { CustomModalConfirmComponent } from '../common/CustomModalConfirmation.component';



interface DefaultFormValues {
    email: string;
    password: string;
}



const schema = yup.object().shape({
    userName: yup.string()
        .min(6, 'El nombre de usuario debe tener al menos 6 caracteres')
        .matches(
            /^\S*$/, 'El nombre de usuario no debe contener espacios'
        )
        .required('Nombre de usuario es requerido'),

    email: yup.string()
        .email('El correo electrónico es inválido')
        .required('Correo electrónico es requerido'),

    password: yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(50, 'La contraseña no puede tener más de 50 caracteres')
        .matches(
            /(?:(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*)/,
            'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
        )
        .required('La contraseña es requerida'),

})

const RegisterForm: React.FC = () => {
    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState<boolean>(false)

    const [defaultFormValues, setDefaultFormValues] = useState<DefaultFormValues>({ email: '', password: '' })

    const navigation = useNavigation<LoginScreenNavigationProp>();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const { submitRegister, loading, error } = useSubmitRegister();

    const onSubmit = (formData: IRegisterUser) => {
        submitRegister(formData, () => {
            setIsModalConfirmVisible(true)
            setDefaultFormValues({
                email: formData.email,
                password: formData.password
            })





        });
    };

    const handleCloseModalConfirm = () => {
        setIsModalConfirmVisible(false)

        console.log("default values", defaultFormValues);
        navigation.navigate('Login', defaultFormValues);
    }


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <CustomText>Error: {error}</CustomText>;
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, width: '90%' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} >
            <ScrollView style={styles.containerScroll}>
                <View style={styles.container}> 

                    <View style={styles.containerIcon}>
                        <Icon name="people-circle-outline" size={180} color="#C57D05" />
                    </View>
                    <CustomControllerInput
                        control={control}
                        name="userName"
                        placeholder="Ingrese el username"
                        iconName="people"
                        size={20}
                        color="rgb(95, 58, 32)"
                        errors={errors}
                        keyboardType="email-address"
                    />
                    <CustomControllerInput
                        control={control}
                        name="email"
                        placeholder="Ingrese el email"
                        iconName="email"
                        size={20}
                        color="rgb(95, 58, 32)"
                        errors={errors}
                        keyboardType="email-address"
                    />
                    <CustomControllerInput
                        control={control}
                        name="password"
                        placeholder="Ingrese la contraseña"
                        iconName="password"
                        size={20}
                        color="rgb(95, 58, 32)"
                        errors={errors}
                        secureTextEntry={true}
                    />


                    <CustomButton
                        title='Registrarse'
                        onPress={handleSubmit(onSubmit)}
                        style={styles.touchableTextRegister}
                    />

                    <CustomModalConfirmComponent
                        visible={isModalConfirmVisible}
                        onClose={handleCloseModalConfirm}
                        text='Usuario registrado exitosamente'
                    />

                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    containerScroll: {
        width: '100%',
    },
    container: {
        width: '100%',
        gap: 20,
    
    },
    touchableTextRegister: {
        backgroundColor: '#a85230',
        justifyContent: 'center'
    },
    containerIcon: {
        alignItems: 'center'
    }
})



export default RegisterForm;