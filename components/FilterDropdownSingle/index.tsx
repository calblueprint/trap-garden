import React, { useState } from 'react';
import Select, {
  ActionMeta,
  components,
  GroupBase,
  MultiValue,
  OptionProps,
  SingleValue,
} from 'react-select';
import { DropdownOption } from '@/types/schema';
import { customSelectStyles } from '../FilterDropdownMultiple/styles';
import { FilterDropdownInput } from './styles';

interface FilterDropdownProps<T> {
  value: DropdownOption<T>;
  setStateAction: React.Dispatch<React.SetStateAction<DropdownOption<T>>>;
  options: DropdownOption<T>[];
  placeholder: string;
  disabled?: boolean;
}

export default function FilterDropdownSingle<T>({
  value,
  setStateAction,
  options,
  placeholder,
  disabled,
}: FilterDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setStateAction(event.target.value);
  //   setIsOpen(false);
  // };

  const handleChange = (
    selectedOptions:
      | SingleValue<DropdownOption<T>>
      | MultiValue<DropdownOption<T>>,
    _actionMeta: ActionMeta<DropdownOption<T>>,
  ) => {
    if (!Array.isArray(selectedOptions)) {
      setStateAction(selectedOptions as DropdownOption<T>);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <FilterDropdownInput
    //   name={name}
    //   id={id}
    //   onChange={handleChange}
    //   onClick={handleToggle}
    //   onBlur={() => setIsOpen(false)}
    //   value={value}
    //   $hasValue={value !== ''}
    //   disabled={disabled}
    // >
    //   {/*Default placeholder text*/}
    //   <option value="" disabled hidden>
    //     {placeholder}
    //   </option>
    //   {options.map((option, index) => (
    //     <option key={index} value={option.value}>
    //       {option.label}
    //     </option>
    //   ))}
    // </FilterDropdownInput>
    <Select
      options={options}
      value={value}
      isDisabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
      closeMenuOnSelect={false}
      styles={customSelectStyles}
      isSearchable={false}
      hideSelectedOptions={false}
      isClearable={false}
    />
  );
}
