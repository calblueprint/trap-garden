import React from 'react';
import { InputWrapper, StyledInput, StyledLabel } from './styles';

interface TextInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (s: string) => void;
  isVisible?: boolean;
  toggleVisibility?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  type,
  placeholder,
  onChange,
  isVisible,
  value,
  toggleVisibility,
}) => {
  const inputType = type === 'password' && isVisible ? 'text' : type;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <InputWrapper>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
        <StyledInput
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </InputWrapper>
      {type === 'password' && toggleVisibility && (
        <button
          type="button"
          onClick={toggleVisibility}
          style={{
            marginBottom: '10px',
          }}
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      )}
    </div>
  );
};

export default TextInput;
