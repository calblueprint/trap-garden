import React from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { DropdownOption } from '@/types/schema';
import { customSelectStyles } from './styles';

interface FilterDropdownProps<T> {
  value: DropdownOption<T> | null;
  setStateAction: React.Dispatch<
    React.SetStateAction<DropdownOption<T> | null>
  >;
  options: DropdownOption<T>[];
  placeholder: string;
  disabled?: boolean;
  // for custom styling since initial dropdown to select user's state
  // is a different size to a normal single dropdown
  small?: boolean;
}

export default function FilterDropdownSingle<T>({
  value,
  setStateAction,
  options,
  placeholder,
  disabled,
  small = false,
}: FilterDropdownProps<T>) {
  const handleChange = (
    selectedOptions:
      | SingleValue<DropdownOption<T>>
      | MultiValue<DropdownOption<T>>,
  ) => {
    if (!Array.isArray(selectedOptions)) {
      setStateAction(selectedOptions as DropdownOption<T>);
    }
  };

  return (
    <Select
      options={options}
      value={value}
      isDisabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
      closeMenuOnSelect={false}
      styles={customSelectStyles<T>(small)}
      isSearchable={false}
      hideSelectedOptions={false}
      menuPosition="fixed"
    />
  );
}
