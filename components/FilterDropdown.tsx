import React, { useState } from 'react';

interface FilterDropdownProps {
  name: string;
  id: string;
  setStateAction: React.SetStateAction<any>;
  options: string[];
  placeholder: string;
}

export default function FilterDropdown(props: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setStateAction(event.target.value);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <select
      name={props.name}
      id={props.id}
      onChange={handleChange}
      onClick={handleToggle}
      onBlur={() => setIsOpen(false)}
    >
      {/*Default placeholder text*/}
      <option disabled={true} selected={true} hidden={true}>
        {props.placeholder}
      </option>
      {props.options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
