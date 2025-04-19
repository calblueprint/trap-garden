import React, { useEffect, useRef, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P2 } from '@/styles/text';
import Icon from '../Icon';
import { DropdownIcon } from './styles';

interface DateInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function DateInput({
  label,
  value,
  onChange,
  placeholder = '',
}: DateInputProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Flex $direction="column" $gap="4px">
      {label && (
        <P2 as="label" htmlFor="date">
          {label}
        </P2>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* config for Date Picker */}
        <DatePicker
          onChange={newValue => {
            onChange(new Date(newValue?.toString() ?? '').toISOString());
          }}
          value={dayjs(value)}
          disableFuture
          open={isDatePickerOpen}
          onOpen={() => setIsDatePickerOpen(true)}
          onClose={() => setIsDatePickerOpen(false)}
          format="MM/DD/YYYY"
          enableAccessibleFieldDOMStructure={false}
          // custom styling for displayed date
          slotProps={{
            textField: {
              placeholder: placeholder,
              inputProps: {
                readOnly: true,
              },
              onClick: () => setIsDatePickerOpen(true),
              sx: {
                '& input': {
                  color: COLORS.midgray,
                  cursor: 'pointer',
                  fontFamily: 'Lexend',
                  fontSize: '0.875rem',
                  fontWeight: 300,
                  padding: '12px 0px 12px 12px',
                  width: '100%',
                },
              },
            },
          }}
          slots={{
            // customize icon for the calendar to open the date picker
            openPickerIcon: () => (
              <DropdownIcon>
                <Icon type="calendar" />
              </DropdownIcon>
            ),
          }}
        />
      </LocalizationProvider>
    </Flex>
  );
}
