// src/components/contacts/ImagePickerComponent.tsx
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImageToCloudinary } from '../../config/cloudinary.config';
import CustomTouchableIcon from '../common/CustomIconTouchable.component';

interface ImagePickerProps {
  onImageSelected: (imageUrl: string) => void;
  initialImage?: string; 
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({ onImageSelected, initialImage }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  // useEffect(() => {
  //   if (initialImage) {
  //     setImageUri(initialImage);
  //   }
  // }, [initialImage]);

  const handleImagePick = async (fromGallery: boolean) => {
    const result = fromGallery
      ? await launchImageLibrary({ mediaType: 'photo' })
      : await launchCamera({ mediaType: 'photo' });

    if (result.didCancel || !result.assets) {
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
      <Image
        source={{ uri: imageUri || 'https://i.ibb.co/27q4LTW/vectors-3.png' }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
        resizeMode="cover"
      />
      <View style={styles.containerIcons}>
        <CustomTouchableIcon iconName="photo-camera" onPress={() => handleImagePick(false)} size={35} />
        <CustomTouchableIcon iconName="image-search" onPress={() => handleImagePick(true)} size={35} />
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
});

export default ImagePickerComponent;
