import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

// Create new context
export const SearchTextContext = createContext<SearchTextContext | null>(null);

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // -- STATE 1 : search input value
  const [searchText, setSearchText] = useState("");
  // Custom hook for debounced serch input value
  const debouncedSearchText = useDebounce(searchText, 250);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
