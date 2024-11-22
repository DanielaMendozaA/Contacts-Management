import { ActivityIndicator, Platform, ToastAndroid, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useSubmitLogin from '../../hooks/auth/useSubmitLogin';
import CustomText from '../common/CustomText.component';
import { ILoginUser } from '../../interfaces/users/user.interface';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LoginScreenNavigationProp, LoginScreenRoutenProp, RegisterScreenNavigationProp } from '../../navigation/types/types';
import CustomControllerInput from '../common/CustomControllerInput.component';
import CustomButton from '../common/CustomTextTouchable.component';
import { useEffect, useState } from 'react';
import { CustomModalConfirmComponent } from '../common/CustomModalConfirmation.component';



const schema = yup.object().shape({
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



const LoginForm: React.FC = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const { params } = useRoute<LoginScreenRoutenProp>();
    const { email = '', password = '' } = params || {};
    console.log("email y password", email, password);
    const [isModalErroVisible, setIsModalErroVisible] = useState(false)
    const navigationLogin = useNavigation<LoginScreenNavigationProp>();

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email,
            password
        }
    });

    useEffect(() => {
        setValue('email', email);
        setValue('password', password);
    }, [email, password]);

    const { submitLogin, loading, error } = useSubmitLogin();

    const onSubmit = async (formData: ILoginUser) => {
        await submitLogin(formData, () => {
          if (error) {
            setIsModalErroVisible(true);
          } else {
            if (Platform.OS === 'android') {
              ToastAndroid.show("¡Bienvenido!", ToastAndroid.SHORT);
            }
          }
        });
      };

      const closeModalError = () => {
        setIsModalErroVisible(false);
        navigationLogin.navigate('Login', { email: '', password: ''}); 
      };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerIcon}>
                <Icon name="people-circle-outline" size={180} color="#C57D05" />
            </View>

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

            <View>
                <CustomButton
                    title='Iniciar Sesión'
                    onPress={handleSubmit(onSubmit)}
                    style={styles.touchableText}
                />

                <CustomButton
                    title='Registrarse'
                    onPress={() => navigation.navigate('Register')}
                    style={styles.touchableTextRegister}
                />
            </View>

            {isModalErroVisible && (
        <CustomModalConfirmComponent
          visible={isModalErroVisible}
          onClose={closeModalError}
          text={`Error: ${error}`} 
        />
      )}

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        justifyContent: 'center',
        width: '100%',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    touchableText: {
        justifyContent: 'center',
    },
    touchableTextRegister: {
        backgroundColor: '#a85230',
        justifyContent: 'center',
    },
    containerIcon: {
        alignItems: 'center'
    },
    // containerButtons: {
    //     width: 270,
    //     alignSelf: 'center'
    // }
})


export default LoginForm;