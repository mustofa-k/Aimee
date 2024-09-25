import React, { createContext, useState } from 'react';

// Buat context untuk filteredData
export const FilterContext = createContext();

// Buat provider untuk membungkus komponen dengan akses ke context
export const FilterProvider = ({ children }) => {
  // State untuk menyimpan data hasil filter
  const [filteredData, setFilteredData] = useState([]);

  return (
    <FilterContext.Provider value={{ filteredData, setFilteredData }}>
      {children}
    </FilterContext.Provider>
  );
};
