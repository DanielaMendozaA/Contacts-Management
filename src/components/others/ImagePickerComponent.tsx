import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { uploadImageToCloudinary } from '../../config/cloudinary.config';
import CustomTouchableIcon from '../common/CustomIconTouchable.component';
import { ensureLocationPermission } from '../../utilities/permissions';
import { Permissions } from '../../enums/permission.enum';

interface ImagePickerProps {
  onImageSelected: (imageUrl: string) => void;
  initialImage?: string;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({ onImageSelected, initialImage }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImagePick = async (fromCamera: boolean) => {
    let result
    if (fromCamera) {
      const hasPermissionCamera = await ensureLocationPermission(Permissions.CAMERA);
      if (hasPermissionCamera) {
        result = await launchCamera({ mediaType: 'photo' });
      } else {
        Alert.alert(
          "Permiso Denegado",
          "No se pudo obtener el permiso de camara. Por favor, actívalo en Configuración."
        );
      }
    } else {
      const hasPermissionGalery = await ensureLocationPermission(Permissions.READ_MEDIA_IMAGES)
      if (hasPermissionGalery) {
        result = await launchImageLibrary({ mediaType: 'photo' })
      } else {
        Alert.alert(
          "Permiso Denegado",
          "No se pudo obtener el permiso de camara. Por favor, actívalo en Configuración."
        );
      }
    }

    if (!result || result.didCancel || !result.assets) {
      return;
    }

    const { uri } = result.assets[0];
    if (uri) {
      setImageUri(uri);

      try {
        const cloudinaryUrl = await uploadImageToCloudinary(uri);
        onImageSelected(cloudinaryUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }


  };

  return (
    <View style={styles.container}>

      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Icon
          name="account-circle"
          size={150}
          style={styles.icon}
          color="#D0B8A8"
        />
      )}

      <View style={styles.containerIcons}>
        <CustomTouchableIcon
          iconName="photo-camera"
          onPress={() => handleImagePick(true)}
          size={35} />
        <CustomTouchableIcon
          iconName="image-search"
          onPress={() => handleImagePick(false)}
          size={35} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20
  },
  containerIcons: {
    flexDirection: 'row',
    gap: 15
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  icon: {
    width: 150,
    height: 150,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImagePickerComponent;
