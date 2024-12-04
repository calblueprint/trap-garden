import React from 'react';
import Select, { MultiValue } from 'react-select';
import { DropdownOption } from '@/types/schema';
import { StyledMultiSelect } from './styles';

interface FilterDropdownProps<T> {
  value: DropdownOption<T>[];
  setStateAction: React.Dispatch<React.SetStateAction<DropdownOption<T>[]>>;
  options: DropdownOption<T>[];
  placeholder: string;
  disabled?: boolean;
}

export default function FilterDropdownMultiple<T>({
  value,
  setStateAction,
  options,
  placeholder,
  disabled = false,
}: FilterDropdownProps<T>) {
  const handleChange = (selectedOptions: MultiValue<DropdownOption<T>>) => {
    setStateAction(selectedOptions as DropdownOption<T>[]);
  };

  return (
    <Select
      options={options}
      isMulti
      value={value}
      isDisabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
      closeMenuOnSelect={false}
    />
  );
}
