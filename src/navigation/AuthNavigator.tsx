import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/Register.screen';
import LoginScreen from '../screens/auth/Login.screen';


const Stack = createNativeStackNavigator();

const AuthNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        title: 'Iniciar Sesión',
        headerStyle: {
          backgroundColor: '#795757',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        title: 'Registrarse',
        headerStyle: {
          backgroundColor: '#795757',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerTitleAlign: 'center',
      }} />
  </Stack.Navigator>
);

export default AuthNavigator;
