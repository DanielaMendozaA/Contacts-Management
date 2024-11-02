import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsScreen from '../screens/contacts/Contact.screen';
import ContactDetailScreen from '../screens/contacts/ContactDetail.screen';
import TabNavigator from './TabNavigator';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTouchableIcon from '../components/common/CustomIconTouchable.component';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactList"
        component={TabNavigator}
        options={{
          title: 'Mis Contactos',
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
        name="ContactDetail"
        component={ContactDetailScreen}
        options={{
          title: '',
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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10
  }
})

export default StackNavigator;
