import React, { useEffect, useRef, useState } from 'react';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P2 } from '@/styles/text';
import { DropdownOption } from '@/types/schema';
import { DropdownIcon } from '../DateInput/styles';
import Icon from '../Icon';
import {
  DropdownIconWrapper,
  HorizontalLine,
  NoBorderContainer,
  NoBorderContent,
  Option,
  OptionsContainer,
  SelectContainer,
} from './styles';

interface CustomSelectProps<T> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  iconType?: IconType;
  isContainerClickable?: boolean;
  border?: boolean;
}

export default function CustomSelect<T>({
  value,
  options,
  onChange,
  placeholder,
  label,
  id,
  iconType = 'pencil',
  isContainerClickable = false,
  border = true,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

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

  const componentId = id ?? `${label}-CustomSelect`;

  return (
    <Flex $direction="column" $gap="4px">
      {label && (
        <P2 as="label" htmlFor={componentId}>
          {label}
        </P2>
      )}
      {border ? (
        // Default Container Style
        <SelectContainer
          ref={containerRef}
          onClick={isContainerClickable ? () => setIsOpen(!isOpen) : undefined}
        >
          <P2 $color={COLORS.midgray}>
            {options.find(option => option.value === value)?.label ||
              placeholder}
          </P2>
          <DropdownIcon id={componentId} onClick={() => setIsOpen(!isOpen)}>
            <Icon type={iconType} />
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
      ) : (
        // No-Border Style
        <NoBorderContainer ref={containerRef}>
          <NoBorderContent onClick={() => setIsOpen(!isOpen)}>
            <P2 $color={COLORS.midgray}>
              {options.find(option => option.value === value)?.label ||
                placeholder}
            </P2>

            <DropdownIconWrapper>
              <Icon type="dropdown" />
            </DropdownIconWrapper>
          </NoBorderContent>
          <HorizontalLine />
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
        </NoBorderContainer>
      )}
    </Flex>
  );
}
