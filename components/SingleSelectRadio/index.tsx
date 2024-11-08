import { useState } from 'react';
import { ComponentContainer, RadioInput, RadioLabel } from './styles';

interface Option {
  label: string;
  value: string;
}

interface SingleSelectRadioGroupProps {
  name: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function SingleSelectRadioGroup({
  name,
  options,
  defaultValue,
  onChange,
}: SingleSelectRadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0].value,
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div>
      {options.map(option => (
        <ComponentContainer
          key={option.value}
          isSelected={selectedValue === option.value}
        >
          <RadioLabel isSelected={selectedValue === option.value}>
            {option.label}
          </RadioLabel>
          <RadioInput
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
          />
        </ComponentContainer>
      ))}
    </div>
  );
}

// Example usage
// import SingleSelectRadioGroup from '@/components/SingleSelectRadio';
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
