import React, { useEffect, useRef } from 'react';
import Icon from '../Icon';
import {
  DateInputWrapper,
  DropdownIcon,
  HiddenDateInput,
  SelectContainer,
  SelectedValue,
} from './styles';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  min?: string;
  max?: string;
}

const DateInput = ({
  value,
  onChange,
  label = 'Select Date',
  min,
  max,
}: DateInputProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Automatically show picker when dropdown icon is clicked
  const handleDropdownClick = () => {
    // Use requestAnimationFrame to ensure the input is rendered before showing picker
    requestAnimationFrame(() => {
      hiddenInputRef.current?.showPicker();
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return label;

    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <DateInputWrapper>
      <SelectContainer ref={containerRef} style={{ position: 'relative' }}>
        <SelectedValue>{formatDate(value)}</SelectedValue>
        <DropdownIcon onClick={handleDropdownClick}>
          <Icon type="calendar" />
        </DropdownIcon>

        <HiddenDateInput
          ref={hiddenInputRef}
          type="date"
          value={value}
          onChange={e => {
            onChange(e.target.value);
          }}
          min={min}
          max={max}
        />
      </SelectContainer>
    </DateInputWrapper>
  );
};

export default DateInput;
