import React from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { DropdownOption } from '@/types/schema';

interface FilterDropdownProps {
  value: DropdownOption[];
  setStateAction: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
  options: string[];
  placeholder: string;
}

export default function FilterDropdownMultiple({
  value,
  setStateAction,
  options,
  placeholder,
}: FilterDropdownProps) {
  return (
    <MultiSelect
      options={options.map(option => ({ label: option, value: option }))}
      value={value}
      onChange={setStateAction}
      labelledBy={placeholder}
      hasSelectAll={false}
      overrideStrings={{ selectSomeItems: placeholder }}
      disableSearch
    />
  );
}
