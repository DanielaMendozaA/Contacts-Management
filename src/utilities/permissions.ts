import { PermissionsAndroid, Alert } from 'react-native';
import { check, RESULTS, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
import { Permissions } from '../enums/permission.enum';

export async function ensureLocationPermission(permission: Permissions): Promise<boolean> {
  try {
    let permissionStatus: PermissionStatus
    switch (permission) {
      case Permissions.CAMERA:
        permissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);
        break;
      case Permissions.ACCESS_FINE_LOCATION:
        permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        break;
      case Permissions.READ_MEDIA_IMAGES:
        permissionStatus = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        break;
      default:
        throw new Error('Unknown permission')

    }

    if (permissionStatus === RESULTS.GRANTED) {
      console.log('Permiso ya concedido', permissionStatus);
      return true
    } 

    const permissionGranted: Promise<boolean> = requestLocationPermission(permission)

    return permissionGranted

  } catch (err) {
    console.warn(err);
    return false;
  }
}


async function requestLocationPermission(type: Permissions): Promise<boolean> {
  try {
    let permissionType 
    let title: string
    let message: string

    switch (type) {
      case Permissions.CAMERA:
        permissionType = PermissionsAndroid.PERMISSIONS.CAMERA;
        title = "Permiso de Camara"
        message = "Se necesita acceso a la camara"
        break;
      case Permissions.ACCESS_FINE_LOCATION:
        permissionType = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
         title = "Permiso de Ubicación Precisa"
         message = "Se necesita acceso a la ubicación precisa"
        break;
      case Permissions.READ_MEDIA_IMAGES:
        permissionType = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
        title = "Permiso para acceder a la galeria"
        message = "Se necesita acceso a la galeria"
        break;
      default:
        throw new Error('Unknown permission')

    }

    if (!permissionType) {
      throw new Error('Permission type is undefined');
    }


    const granted = await PermissionsAndroid.request(permissionType, {
      title: title,
      buttonPositive: "Aceptar",
      buttonNegative: "Cancelar",
      message: message
    });

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
}
