import React from 'react';

interface PasswordInputProps {
  value: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isVisible: boolean;
  toggleVisibility: () => void;
  name: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  isVisible,
  toggleVisibility,
  name,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <input
        type={isVisible ? 'text' : 'password'}
        name={name}
        onChange={onChange}
        value={value || ''}
        placeholder={placeholder}
      />
      <button type="button" onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default PasswordInput;
