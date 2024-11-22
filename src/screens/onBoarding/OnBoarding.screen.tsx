import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, StyleSheet } from 'react-native';
import { useOnboarding } from '../../context/OnBoarding';

const OnboardingScreen = ({ onDone }: { onDone: () => void }) => {
  const { markOnboardingSeen } = useOnboarding();

  const handleOnDone = async () => {
    await markOnboardingSeen();
    onDone();
  };

  return (
    <Onboarding
      onDone={handleOnDone}
      pages={[
        {
          backgroundColor: '#d09a9a',
          image: <Image source={{ 
            uri: 'https://i.ibb.co/PwN18BQ/welcome.jpg' }} 
            style={{ width: 300, height: 200, resizeMode: 'contain' }} />,
          title: 'Bienvenido a Close To You',
          subtitle: '¡La mejor forma de guardar tus contactos!',
          titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#333' },
          subTitleStyles: { fontSize: 16, color: '#171414', textAlign: 'center' },
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={{ 
            uri: 'https://res.cloudinary.com/du4qblzak/image/upload/fl_preserve_transparency/v1731535824/oqfuj5fjmbixrjn6xayr.jpg?_s=public-apps'}} 
            style={{ width: 400, height: 300, resizeMode: 'contain' }} />,
          title: 'Registro',
          subtitle: 'El primer paso es registrarte en nuestra aplicación',
          titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#333' },
          subTitleStyles: { fontSize: 16, color: '#171414', textAlign: 'center' },
        },
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={{ 
            uri: 'https://res.cloudinary.com/du4qblzak/image/upload/fl_preserve_transparency/v1731535845/nceti4eqhyxdqoq4mhzq.jpg?_s=public-apps'}} 
            style={{ width: 400, height: 300, resizeMode: 'contain' }} />,
          title: 'Inicia Sesión',
          subtitle: 'Ingresa con las credenciales creadas (email y contraseña)',
          titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#333' },
          subTitleStyles: { fontSize: 16, color: '#171414', textAlign: 'center' },
        },
        {
          backgroundColor: '#3873a0',
          image: <Image source={{ 
            uri: 'https://res.cloudinary.com/du4qblzak/image/upload/fl_preserve_transparency/v1731535806/mmdyx3q0g3ev7ylbvchq.jpg?_s=public-apps'}} 
            style={{ width: 400, height: 300, resizeMode: 'contain' }} />,
          title: 'Tu lista de contactos',
          subtitle: 'En esta pantalla encontrarás todos tus contactos, puede realizar filtrado de coincidencias por nombre o telefóno',
          titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#efdcdc' },
          subTitleStyles: { fontSize: 16, color: '#ddc7c7', textAlign: 'center' },
        },
        {
          backgroundColor: '#7f158b',
          image: <Image source={{ 
            uri: 'https://res.cloudinary.com/du4qblzak/image/upload/fl_preserve_transparency/v1731535788/huoyyo3dago1am8kp83x.jpg?_s=public-apps'}} 
            style={{ width: 400, height: 300, resizeMode: 'contain' }} />,
          title: 'Tu lista de contactos',
          subtitle: 'Puedes ir al detalle del contacto seleccionando el contacto en la lista de contactos, puedes eliminarlo, editarlo o marcarlo como favorito',
          titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#efdcdc' },
          subTitleStyles: { fontSize: 16, color: '#ddc7c7', textAlign: 'center' },
        },
        // {
        //   backgroundColor: '#186a83',
        //   image: <Image source={{ 
        //     uri: 'https://res.cloudinary.com/du4qblzak/image/upload/fl_preserve_transparency/v1731535788/huoyyo3dago1am8kp83x.jpg?_s=public-apps'}} 
        //     style={{ width: 400, height: 300, resizeMode: 'contain' }} />,
        //   title: 'Tu lista de contactos',
        //   subtitle: 'Puedes ir al detalle del contacto seleccionando el contacto en la lista de contactos, puedes eliminarlo, editarlo o marcarlo como favorito',
        //   titleStyles: { fontSize: 24, fontWeight: 'bold', color: '#efdcdc' },
        //   subTitleStyles: { fontSize: 16, color: '#ddc7c7', textAlign: 'center' },
        // },
      ]}
    />
  );
};

export default OnboardingScreen;
