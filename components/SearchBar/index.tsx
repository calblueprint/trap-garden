import React from 'react';
import Icon from '../Icon';
import { IconWrapper, SearchBarContainer, SearchBarInput } from './styles';

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
      <IconWrapper>
        <Icon type="search" />
      </IconWrapper>
      <SearchBarInput
        type="search"
        placeholder="Search Plant"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </SearchBarContainer>
  );
}
