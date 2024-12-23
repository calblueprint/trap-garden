import { useState } from 'react';
import {
  ComponentContainer,
  RadioButton,
  RadioInput,
  RadioLabel,
} from './styles';

interface Option<T> {
  label: string;
  value: T;
}

interface RadioGroupProps<T> {
  name: string;
  options: Option<T>[];
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export default function RadioGroup<T>({
  name,
  options,
  defaultValue,
  onChange,
}: RadioGroupProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T | null>(
    defaultValue || null,
  );

  const handleChange = (value: T) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  return (
    <ComponentContainer>
      {options.map(option => (
        <RadioButton
          key={String(option.value)}
          $isSelected={selectedValue === option.value}
          onClick={() => handleChange(option.value)}
        >
          <RadioLabel
            $isSelected={selectedValue === option.value}
            htmlFor={option.label + '-radio'}
          >
            {option.label}
          </RadioLabel>
          <RadioInput
            name={name}
            value={String(option.value)}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            id={option.label + '-radio'}
          />
        </RadioButton>
      ))}
    </ComponentContainer>
  );
}

// Example usage
// 'use client';
// import RadioGroup from '@/components/RadioGroup';
// export default function Home() {
//   return (
//     <Container>
//       <Image src={BPLogo} alt="Blueprint Logo" />
//       <p>Open up app/page.tsx to get started!</p>
//       <SingleSelectRadioGroup
//         name="exampleRadioGroup"
//         options={[
//           { label: 'School', value: 'option1' },
//           { label: 'Community', value: 'option2' },
//           { label: 'Individual', value: 'option3' },
//         ]}
//         defaultValue="option2"
//       />
//     </Container>
//   );
// }
