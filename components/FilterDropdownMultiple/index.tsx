import React from 'react';
import { DropdownOption } from '@/types/schema';
import { StyledMultiSelect } from './styles';

interface FilterDropdownProps<T> {
  value: DropdownOption<T>[];
  setStateAction: React.Dispatch<React.SetStateAction<DropdownOption<T>[]>>;
  options: DropdownOption<T>[];
  placeholder: string;
}

export default function FilterDropdownMultiple<T>({
  value,
  setStateAction,
  options,
  placeholder,
}: FilterDropdownProps<T>) {
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
