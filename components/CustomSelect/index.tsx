// import React, { useEffect, useRef, useState } from 'react';
// import { IconType } from '@/lib/icons';
// import COLORS from '@/styles/colors';
// import { Flex } from '@/styles/containers';
// import { P2 } from '@/styles/text';
// import { DropdownOption } from '@/types/schema';
// import Icon from '../Icon';
// import {
//   DropdownIcon,
//   Option,
//   OptionsContainer,
//   SelectContainer,
// } from './styles';

// interface CustomSelectProps<T> {
//   value: T;
//   options: DropdownOption<T>[];
//   onChange: (value: T) => void;
//   placeholder?: string;
//   label?: string;
//   id?: string;
//   iconType?: IconType;
//   isContainerClickable?: boolean; // New boolean prop
// }

// export default function CustomSelect<T>({
//   value,
//   options,
//   onChange,
//   placeholder,
//   label,
//   id,
//   iconType = 'pencil',
//   isContainerClickable = false, // Default to false
// }: CustomSelectProps<T>) {
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const handleOptionClick = (optionValue: T) => {
//     onChange(optionValue);
//     setIsOpen(false);
//   };

//   // Close the dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const componentId = id ?? `${label}-CustomSelect`;

//   return (
//     <Flex $direction="column" $gap="4px">
//       {label && (
//         <P2 as="label" htmlFor={componentId}>
//           {label}
//         </P2>
//       )}
//       <SelectContainer
//         ref={containerRef}
//         onClick={isContainerClickable ? () => setIsOpen(!isOpen) : undefined}
//       >
//         <P2 $color={COLORS.midgray}>
//           {options.find(option => option.value === value)?.label || placeholder}
//         </P2>
//         <DropdownIcon id={componentId} onClick={() => setIsOpen(!isOpen)}>
//           <Icon type={iconType} />
//         </DropdownIcon>
//         {isOpen && (
//           <OptionsContainer>
//             {options.map(option => (
//               <Option
//                 key={String(option.value)}
//                 onClick={() => handleOptionClick(option.value)}
//               >
//                 {option.label}
//               </Option>
//             ))}
//           </OptionsContainer>
//         )}
//       </SelectContainer>
//     </Flex>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P2 } from '@/styles/text';
import { DropdownOption } from '@/types/schema';
import Icon from '../Icon';
import {
  DropdownIcon,
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
  styleType?: 'container' | 'no-border'; // New prop for styling
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
  styleType = 'container', // Default to 'container'
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
      {styleType === 'container' ? (
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
              {value
                ? options.find(option => option.value === value)?.label
                : placeholder}
            </P2>
            <DropdownIcon id={componentId}>
              <Icon type="dropdown" />
            </DropdownIcon>
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
