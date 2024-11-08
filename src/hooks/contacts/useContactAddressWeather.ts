import { useEffect, useState } from 'react';

import fetchAddressFromCoordinates from '../../utilities/fetch-adress';

const useContactAdress = (latitude: number, longitude: number) => {
  const [address, setAddress] = useState<string>("");


  useEffect(() => {
    const fetchAddress = async () => {
      const addressText = await fetchAddressFromCoordinates(latitude, longitude);
      setAddress(addressText);
    };

    if (latitude && longitude) {
      fetchAddress();
    } else {
      setAddress("Ubicación no establecida");
    }
  }, [latitude, longitude]);

  return { address } ;
}

export default useContactAdress;
