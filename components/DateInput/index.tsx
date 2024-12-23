import React, { useEffect, useRef } from 'react';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P2 } from '@/styles/text';
import { DropdownIcon, SelectContainer } from '../CustomSelect/styles';
import Icon from '../Icon';
import { DateInputWrapper, HiddenDateInput } from './styles';

interface DateInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: string;
  max?: string;
}

export default function DateInput({
  label,
  value,
  onChange,
  placeholder = '',
  min,
  max,
}: DateInputProps) {
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
    if (!dateString) return placeholder;

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
    <Flex $direction="column" $gap="4px">
      {label && (
        <P2 as="label" htmlFor="date">
          {label}
        </P2>
      )}
      <DateInputWrapper onClick={handleDropdownClick}>
        <SelectContainer ref={containerRef}>
          <P2 $color={COLORS.midgray}>{formatDate(value)}</P2>
          <DropdownIcon onClick={handleDropdownClick}>
            <Icon type="calendar" />
          </DropdownIcon>

          <HiddenDateInput
            ref={hiddenInputRef}
            type="date"
            id="date"
            value={value}
            onChange={e => {
              onChange(e.target.value);
            }}
            min={min}
            max={max}
          />
        </SelectContainer>
      </DateInputWrapper>
    </Flex>
  );
}
