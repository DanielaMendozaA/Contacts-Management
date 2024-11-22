import React, { useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import CustomTouchableIcon from './CustomIconTouchable.component';
import CustomButton from './CustomTextTouchable.component';
import CustomText from './CustomText.component';
import { useSyncDeviceContacts } from '../../utilities/syncDeviceContacts';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../redux/features/userThunks';
import { LoginScreenNavigationProp } from '../../navigation/types/types';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { useOnboarding } from '../../context/OnBoarding';

interface ModalProps {
  visible: boolean;
  onClose: () => void;

}



export const CustomModalSettingComponent: React.FC<ModalProps> = ({ visible, onClose }) => {
  const [isModalSettingsVisible, setIsModalSettingsVisible] = useState(false);
  const { syncDeviceContacts, isLoading: isLoadingContacts } = useSyncDeviceContacts();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { signOut } = useAuth();
  const { clearOnboarding } = useOnboarding();

  const changeTheme = () => {
    console.log("------------change theme----------");

  }

  const logout = async () => {
    console.log("Cerrando sesión...");
    await dispatch(removeToken());
    await AsyncStorage.clear();
    signOut()
  };


  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>

        <CustomTouchableIcon
          iconName="close"
          size={40}
          color="#a85230"
          style={styles.closeButton}
          onPress={onClose} />

        <CustomText style={styles.textSetting}>Ajustes</CustomText>

        <View style={styles.containerButtonSetting}>

          <CustomButton
            title="Sinctonizar lista de contactos del dispositivo"
            onPress={syncDeviceContacts}
            iconName='cloud-sync'
            size={30}
            color='#83bbe1'
            style={styles.buttonSetting}

          />
          <CustomButton
            title="Cambiar tema"
            onPress={changeTheme}
            iconName='imagesearch-roller'
            size={30}
            color='#ede37b'
            style={styles.buttonSetting}

          />

          <CustomButton
            title="Tour de bienvenida"
            onPress={clearOnboarding}
            iconName='app-shortcut'
            size={30}
            color='#d985e6'
            style={styles.buttonSetting}

          />

          <CustomButton
            title="Cerrar sesión"
            onPress={logout}
            iconName='logout'
            size={30}
            color='#94ed7b'
            style={styles.buttonSetting}

          />



        </View>

      </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
  closeButton: {
    left: "42%",
  },
  textSetting: {
    backgroundColor: 'rgb(41, 44, 52)',
    height: 200,
    padding: 20,
    fontSize: 50,
    color: '#e9e0db',
    marginBottom: 50
  },
  buttonSetting: {
    backgroundColor: 'rgb(41, 44, 52)',
    margin: 8,
    padding: 20,
    paddingRight: 80
  },
  containerButtonSetting: {
    backgroundColor: 'rgb(41, 44, 52)',
  },
  modalContainer: {
    backgroundColor: 'rgb(16, 18, 24)',
    height: 1000
  }

})
