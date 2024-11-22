import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import OnboardingScreen from '../screens/onBoarding/OnBoarding.screen';

import { useAuth } from '../context/AuthContext';
import { useOnboarding } from '../context/OnBoarding';

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  const { markOnboardingSeen, isOnboardingSeen } = useOnboarding();

  if (isOnboardingSeen === null) {
    return null;
  }

  return (
    <NavigationContainer>
      {isOnboardingSeen === false ? (
        <OnboardingScreen onDone={markOnboardingSeen} />
      ) : isAuthenticated ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
