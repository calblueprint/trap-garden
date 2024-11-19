import React, { useEffect, useRef, useState } from 'react';
import { DropdownOption } from '@/types/schema';
import Icon from '../Icon';
import {
  DropdownIcon,
  Option,
  OptionsContainer,
  SelectContainer,
  SelectedValue,
} from './styles';

interface CustomSelectProps<T> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  label?: string;
}

const CustomSelect = <T extends string | number | boolean>({
  value,
  options,
  onChange,
  label,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SelectContainer ref={containerRef}>
      <SelectedValue>
        {options.find(option => option.value === value)?.label || label}
      </SelectedValue>
      <DropdownIcon onClick={() => setIsOpen(!isOpen)}>
        <Icon type="pencil" />
      </DropdownIcon>
      {isOpen && (
        <OptionsContainer>
          {options.map(option => (
            <Option
              key={String(option.value)}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </Option>
          ))}
        </OptionsContainer>
      )}
    </SelectContainer>
  );
};

export default CustomSelect;
