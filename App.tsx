import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import ThemeProvider from './src/providers/ThemeProvider';
import { ContactsProvider } from './src/context/ContactContext';



const App = () => {
  return (
    <ThemeProvider>
      <ContactsProvider>
      <AppNavigator />
      </ContactsProvider>
    </ThemeProvider>
  )
};

export default App;
