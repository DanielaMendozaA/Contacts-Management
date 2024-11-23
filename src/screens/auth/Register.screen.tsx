import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import RegisterForm from '../../components/auth/RegisterForm.component';

const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(239, 182, 160, 0.5)', 'rgba(175, 94, 62, 0.7)', 'rgba(225, 0, 0, 0.2)']}
        style={styles.containerLinear}
      >
        <RegisterForm />
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8EDE3',
    padding: 10,

  },
  containerLinear: {
    flex: 1,
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
});

export default RegisterScreen;