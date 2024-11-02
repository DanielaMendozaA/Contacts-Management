import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import ThemeProvider from './src/providers/ThemeProvider';



const App = () => {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  )
};

export default App;
