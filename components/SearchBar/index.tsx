import React from 'react';
import { SearchBarContainer, SearchBarInput } from './styles';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <SearchBarContainer>
      <SearchBarInput
        type="text"
        placeholder="Search Plant"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </SearchBarContainer>
  );
}
