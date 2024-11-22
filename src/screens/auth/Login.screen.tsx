import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginForm from '../../components/auth/LoginForm.component';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['rgba(239, 182, 160, 0.5)', 'rgba(175, 94, 62, 0.7)', 'rgba(225, 0, 0, 0.2)']}
          style={styles.containerLinear}
        >

          <LoginForm />
        </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8EDE3',
    padding: 10,
    borderRadius: 20,
  },
  containerLinear: {
    flex: 1,
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

});

export default LoginScreen;