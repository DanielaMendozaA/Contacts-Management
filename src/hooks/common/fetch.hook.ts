import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';



const useFetch = <T>(serviceFunction: () => Promise<any>, dependencies: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceFunction();
      setData(result.data);
    } catch (error: any) {
      console.error(error);
      setError(error.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};



const useFetchContactId = (serviceFunction: () => Promise<any>, dependencies: any[] = []) => {
  const [data, setData] = useState<any | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      const result = await serviceFunction();
      // console.log("resultado desde el hook getone", result);
      
      setData(result.data);
    } catch (error: any) {
      console.error(error);
      setError(error.message || 'Error fetching data desde aqui');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetchEdit: fetchData};
};


export { useFetch, useFetchContactId };
