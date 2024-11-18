import React from 'react';
import { DropdownOption } from '@/types/schema';
import { StyledMultiSelect } from './styles';

interface FilterDropdownProps {
  value: DropdownOption[];
  setStateAction: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
  options: DropdownOption[];
  placeholder: string;
}

export default function FilterDropdownMultiple({
  value,
  setStateAction,
  options,
  placeholder,
}: FilterDropdownProps) {
  return (
    <StyledMultiSelect
      options={options}
      value={value}
      onChange={setStateAction}
      labelledBy={placeholder}
      hasSelectAll={false}
      overrideStrings={{ selectSomeItems: placeholder }}
      disableSearch
    />
  );
}
