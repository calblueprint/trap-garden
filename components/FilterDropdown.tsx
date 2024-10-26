import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { DropdownOption } from '@/types/schema';

interface FilterDropdownProps {
  value: DropdownOption[];
  setStateAction: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
  options: string[];
  placeholder: string;
}

export default function FilterDropdown({
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
    />
    // <select
    //   name={name}
    //   id={id}
    //   onChange={handleChange}
    //   onClick={handleToggle}
    //   onBlur={() => setIsOpen(false)}
    //   value={value}
    // >
    //   {/*Default placeholder text*/}
    //   <option value="" disabled hidden>
    //     {placeholder}
    //   </option>
    //   {options.map((option, index) => (
    //     <option key={index} value={option}>
    //       {option}
    //     </option>
    //   ))}
    // </select>
  );
}
