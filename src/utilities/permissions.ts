import { PermissionsAndroid, Alert } from 'react-native';
import { check, RESULTS, PERMISSIONS, PermissionStatus } from 'react-native-permissions';

export async function ensureLocationPermission(): Promise<boolean> {
  try {
    const fineStatus: PermissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    const coarseStatus: PermissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    let fineGranted: boolean = fineStatus === RESULTS.GRANTED;
    let coarseGranted: boolean = coarseStatus === RESULTS.GRANTED;

    if (fineGranted && coarseGranted) {
      console.log('Permiso ya concedido',fineGranted,  coarseGranted);
      return true;
    }

    if(fineGranted && !coarseGranted){
      coarseGranted = await requestLocationPermission('coarse');
      console.log("pemiso", coarseGranted );
      
      return coarseGranted
    }

    if(!fineGranted && coarseGranted){
      fineGranted = await requestLocationPermission('fine');
      console.log("pemiso", fineGranted );
      return fineGranted
    }



    fineGranted  = await requestLocationPermission('fine');
    coarseGranted = await requestLocationPermission('coarse');
    console.log('Permiso desde afuera',fineGranted,  coarseGranted);
    


    return fineGranted && coarseGranted
  } catch (err) {
    console.warn(err);
    return false;
  }
}


async function requestLocationPermission(type: 'fine' | 'coarse'): Promise<boolean> {
  try {
    const permissionType = 
      type === 'fine' 
        ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION 
        : PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;
    
    const granted = await PermissionsAndroid.request(permissionType, {
      title: type === 'fine' ? "Permiso de Ubicación Precisa" : "Permiso de Ubicación Aproximada",
      message: type === 'fine' 
        ? "Esta aplicación necesita acceder a tu ubicación precisa para mostrar contenido relevante en el mapa." 
        : "Esta aplicación necesita acceder a tu ubicación aproximada para mostrar contenido relevante en el mapa.",
      buttonPositive: "Aceptar",
      buttonNegative: "Cancelar",
    });

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
}
