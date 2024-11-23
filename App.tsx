import React from 'react';

import ThemeProvider from './src/providers/ThemeProvider';
// import { ContactsProvider } from './src/context/ContactContext';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { OnboardingProvider } from './src/context/OnBoarding';


const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {/* <ContactsProvider> */}
          <AuthProvider>
            <OnboardingProvider>
              <RootNavigator />
            </OnboardingProvider>
          </AuthProvider>
        {/* </ContactsProvider> */}
      </ThemeProvider>
    </Provider>
  )
};

export default App;
