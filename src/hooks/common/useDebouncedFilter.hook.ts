// import { useState, useEffect } from 'react';
// import { IContact } from '../../interfaces/contacts/contact.interface'; 

// const useDebouncedFilter = (data: IContact[], query: string, delay: number = 1000) => {
//   const [filteredData, setFilteredData] = useState<IContact[]>([]);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       if (data) {
//         console.log(data);
//         setFilteredData(
          
//           data.filter((contact) =>
//             contact.name.toLowerCase().includes(query.toLowerCase()) ||
//             contact.phone.includes(query)
//           )
//         );
//       }
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [query, data, delay]);

//   return filteredData;
// };

// export default useDebouncedFilter;

import { useState, useEffect } from 'react';
import { IQueryContact } from '../../services/contacts/contact.endpoint';

const useDebounce = (value: IQueryContact | undefined, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); 
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;


