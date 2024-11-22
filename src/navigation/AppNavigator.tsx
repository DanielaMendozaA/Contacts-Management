import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

import ContactDetailScreen from '../screens/contacts/ContactDetail.screen';
import CustomTouchableIcon from '../components/common/CustomIconTouchable.component';
import { CustomModalSettingComponent } from '../components/common/CustomModalSetting';
import OnboardingScreen from '../screens/onBoarding/OnBoarding.screen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isModalSettingsVisible, setIsModalSettingsVisible] = useState(false);
  const openModal = () => {
    setIsModalSettingsVisible(true);
  };

  const closeModalSettings = () => {
    setIsModalSettingsVisible(false);
  };

  return (
    <>
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
            headerRight: () => (
              <CustomTouchableIcon
                iconName="settings"
                size={26}
                color="#c9b0a6"
                onPress={openModal}
                style={styles.icon}
              />
            ),
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

      <CustomModalSettingComponent
        visible={isModalSettingsVisible}
        onClose={closeModalSettings}
      />
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

export default AppNavigator;
