import React, { useState } from 'react';
import { DropdownOption } from '@/types/schema';
import { FilterDropdownInput } from './styles';

interface FilterDropdownProps {
  name?: string;
  id?: string;
  value: string;
  setStateAction: React.Dispatch<React.SetStateAction<string>>;
  options: DropdownOption[];
  placeholder: string;
  disabled?: boolean;
}

export default function FilterDropdownSingle({
  name,
  id,
  value,
  setStateAction,
  options,
  placeholder,
  disabled,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStateAction(event.target.value);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <FilterDropdownInput
      name={name}
      id={id}
      onChange={handleChange}
      onClick={handleToggle}
      onBlur={() => setIsOpen(false)}
      value={value}
      $hasValue={value !== ''}
      disabled={disabled}
    >
      {/*Default placeholder text*/}
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </FilterDropdownInput>
  );
}
