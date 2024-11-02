import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactsScreen from '../screens/contacts/Contact.screen';
import AddContactsScreen from '../screens/contacts/AddContact.screen';
import FavoritesScreen from '../screens/contacts/Favorites.screen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'person';

          if (route.name === 'Contacts') {
            iconName = 'groups';
          } else if (route.name === 'Favorites') {
            iconName = 'star';
          } else if (route.name === 'Add') {
            iconName = 'add';
          }

          return <Icon name={iconName} size={50} color='#D0B8A8' />;
        },
        tabBarStyle: {
          backgroundColor: '#795757',
          height: 60,
          justifyContent: 'center',
          alignContent: 'center'
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#bdbdbd',
        headerShown: false
      })}
    >
      <Tab.Screen name="Contacts"
        component={ContactsScreen}
        options={{
          headerTitle: 'Mis Contactos',
          tabBarLabel: '',
          headerStyle: {
            backgroundColor: 'rgba(26, 124, 227, 1)',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: '' }} />
      <Tab.Screen name="Add" component={AddContactsScreen} options={{
        headerTitle: 'Agregar Contacto',
        tabBarLabel: '',
        headerStyle: {
          backgroundColor: 'rgba(26, 124, 227, 1)',
        }, headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center'
      }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
