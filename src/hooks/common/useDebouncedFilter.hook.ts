import { useState, useEffect } from 'react';
import { IContact } from '../../interfaces/contact.interface'; 

const useDebouncedFilter = (data: IContact[], query: string, delay: number = 1000) => {
  const [filteredData, setFilteredData] = useState<IContact[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (data) {
        setFilteredData(
          data.filter((contact) =>
            contact.name.toLowerCase().includes(query.toLowerCase()) ||
            contact.phone.includes(query)
          )
        );
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, data, delay]);

  return filteredData;
};

export default useDebouncedFilter;
