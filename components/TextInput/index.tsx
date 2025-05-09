import React from 'react';
import Icon from '../Icon';
import {
  IconWrapper,
  InputWrapper,
  StyledInput,
  StyledLabel,
  StyledNotesInput,
} from './styles';

interface TextInputProps {
  label: string;
  id: string;
  type: string;
  value: string | undefined;
  onChange: (s: string) => void;
  isVisible?: boolean;
  toggleVisibility?: () => void;
  error?: boolean;
}

export default function TextInput({
  label,
  id,
  type,
  onChange,
  isVisible,
  value,
  toggleVisibility,
  error,
}: TextInputProps) {
  const inputType = type === 'password' && isVisible ? 'text' : type;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };

  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}

      {type === 'user_notes' ? (
        <StyledNotesInput
          id={id}
          value={value || ''}
          onChange={handleChange}
          $error={error}
        />
      ) : (
        <StyledInput
          id={id}
          type={inputType}
          value={value || ''}
          onChange={handleChange}
          $error={error}
        />
      )}

      {type === 'password' && toggleVisibility && (
        <IconWrapper onClick={toggleVisibility}>
          <Icon type={isVisible ? 'hide' : 'eye'} />
        </IconWrapper>
      )}
    </InputWrapper>
  );
}
