import React from 'react';
import { DropdownOption } from '@/types/schema';
import { StyledMultiSelect } from './styles';

interface FilterDropdownProps<T> {
  value: DropdownOption<T>[];
  setStateAction: React.Dispatch<React.SetStateAction<DropdownOption<T>[]>>;
  options: DropdownOption<T>[];
  placeholder: string;
  disabled: boolean;
}

export default function FilterDropdownMultiple<T>({
  value,
  setStateAction,
  options,
  placeholder,
  disabled,
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
      disabled={disabled}
    />
  );
}
