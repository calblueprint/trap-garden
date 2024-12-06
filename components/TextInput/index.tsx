import React from 'react';
import { IconSvgs } from '@/lib/icons';
import { IconWrapper, InputWrapper, StyledInput, StyledLabel } from './styles';

interface TextInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (s: string) => void;
  isVisible?: boolean;
  toggleVisibility?: () => void;
  error?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  type,
  onChange,
  isVisible,
  value,
  toggleVisibility,
  error,
}) => {
  const inputType = type === 'password' && isVisible ? 'text' : type;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledInput
        id={id}
        type={inputType}
        value={value}
        onChange={handleChange}
        error={error}
      />
      {type === 'password' && toggleVisibility && (
        <IconWrapper onClick={toggleVisibility}>
          {isVisible ? IconSvgs.hide : IconSvgs.eye}
        </IconWrapper>
      )}
    </InputWrapper>
  );
};

export default TextInput;
