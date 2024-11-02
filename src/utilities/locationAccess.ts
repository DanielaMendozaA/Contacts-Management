import { Alert } from 'react-native';
import { ensureLocationPermission } from './permissions'; 

export async function handleLocationAccess() {
  const hasPermission = await ensureLocationPermission();

  if (hasPermission) {
    console.log("Permiso concedido. Puedes acceder a la ubicación.");
  } else {
    Alert.alert(
      "Permiso Denegado",
      "No se pudo obtener el permiso de ubicación. Por favor, actívalo en Configuración."
    );
  }
}
