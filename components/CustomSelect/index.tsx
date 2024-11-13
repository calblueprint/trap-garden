import React, { useEffect, useRef, useState } from 'react';
import {
  DropdownIcon,
  Option,
  OptionsContainer,
  SelectContainer,
  SelectedValue,
} from './styles';

interface DropdownOption<T> {
  label: string;
  value: T;
}

interface CustomSelectProps<T> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  label?: string;
}

const CustomSelect = <T extends string | number | boolean>({
  value,
  options,
  onChange,
  label,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close the dropdown when clicking outside
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

  return (
    <SelectContainer ref={containerRef}>
      <SelectedValue>
        {options.find(option => option.value === value)?.label || label}
      </SelectedValue>
      <DropdownIcon onClick={() => setIsOpen(!isOpen)}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect width="13" height="13" fill="url(#pattern0_1025_14459)" />
          <defs>
            <pattern
              id="pattern0_1025_14459"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_1025_14459"
                transform="scale(0.0111111)"
              />
            </pattern>
            <image
              id="image0_1025_14459"
              width="90"
              height="90"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACn0lEQVR4nO2cvYoUQRDHG02MRDMxEURQt2pPwVQwObeKO8VA9gVMRU62a9VAmEsEn8LPWBPTM/MVfIE7vVRBEb9AGW/hVr1dd3Znapzp/w8mHLbmR211dU/3hAAAAAAAAAAA4P9lxTpnJdJTjfxWjb6K0RsxfnQxLnHdsbWGXuQoRt/V+MdfV6RvYp3rdcfYeCTS+p6C/7gk0t26Y229ZIVsP8mQ7SgZsguisXt7EdGo2QWA7AaVkF+ZjdbPSXbeZ986TTP+XNrI4rIf1v0MqcjeDCmLk0jrRe+ZrwPhLyFFZEyYh2yJtBVSQ/YQVbVsifw4pIRMEVSV7NGq31JIBZlBTBWyxXgQUkEK/NXF6H6JM8gspILMM3iVIxuStXrZkKzF2rLCNbvoPSH1xSCdM7OTQUqUDNmOkiHbUTJkO0pOXrY4Sk5WttQgeXShT1ZIRiY3CkG5gORWIMhkSG4FgkyG5FYgyGRIbgWCTIbkViDIZEhuBchkByDZAUh2AJIdgGQHINmJ1Zvd4zKgNYn8Ci9SncjP3kmk55VuC4gJbTicRm9Il7AlwIEV6xzBvgsn1Hgbm1sc0MgvsIOoWS1f5hFv6gNiVvdzpDAgZnU/Q2NYvdM9rIPO+Xwyo8ZPxPg1JDuxPDx5VCNdnjSpwWSkZHoDPoVyMUlO7J4rU7aMlRJk8ogsC/t2PpBa3vED2W0BMfDtZl93uezsk50FKCwQjaNGD5I+WOPBhezYATF6l/wppqrpGV3FkTEH1PjZ1IV4lJHF0RsnDorRp3++9YDsxdAhX5tx2rxddp+dFGK0MVFupPd5N5K3fv1+f3/dsTYaNf7we4ngz/k6RT5A5t1I3fG1Bo18T40+ivHLvIxcWTtzqO6YAAAAAAAAAACEcvgJELWQyQ46Qq0AAAAASUVORK5CYII="
            />
          </defs>
        </svg>
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
  );
};

export default CustomSelect;
