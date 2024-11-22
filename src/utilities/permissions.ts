import { check, RESULTS, AndroidPermission, request } from 'react-native-permissions';

export async function ensurePermission(permission: AndroidPermission): Promise<boolean> {
  try {
    const permissionStatus = await check(permission)
    if (permissionStatus === RESULTS.GRANTED) {
      return true
    } else {
      const permissionGranted: Promise<boolean> = requestLocationPermission(permission)
      return permissionGranted
    }

  } catch (err) {
    console.warn(err);
    return false;
  }
}


async function requestLocationPermission(type: AndroidPermission): Promise<boolean> {
  try {
    const permissionRequest = await request(type)
    return permissionRequest === RESULTS.GRANTED

  } catch (err) {
    console.warn(err);
    return false;
  }
}
