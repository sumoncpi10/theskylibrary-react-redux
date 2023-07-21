// SearchContext.tsx

import React, { useState, createContext, useContext, FC } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// Create a new context to hold the searchQuery and setSearchQuery
const SearchContext = createContext<SearchContextType>({
  searchQuery: '',
  setSearchQuery: () => {},
});

// Create a custom hook to access the context values
export const useSearchContext = () => useContext(SearchContext);

// Create a provider component that wraps the components needing access to the state
export const SearchProvider: FC = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
