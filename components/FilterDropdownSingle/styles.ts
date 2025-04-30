import { StylesConfig } from 'react-select';
import { useMediaQuery } from '@mui/material';
import styled from 'styled-components';
import { device } from '@/styles/breakpoints';
import COLORS from '@/styles/colors';
import { DropdownOption } from '@/types/schema';

export const FilterDropdownInput = styled.select<{ $hasValue: boolean }>`
  border-radius: 60px;
  padding: 8px 14px 8px 14px;
  gap: 2px;
  text-align: center;
  background-color: ${({ $hasValue }) => ($hasValue ? COLORS.shrub : '#fff')};
  color: ${({ $hasValue }) => ($hasValue ? '#fff' : '#000')};

  &:disabled {
    background-color: ${COLORS.lightgray};
  }
`;

// custom styles for react-select component
// Option type is DropdownOption<T>
export const customSelectStyles = <T>(
  $isSmall: boolean,
): StylesConfig<DropdownOption<T>, true> => ({
  // container
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: '56px',
    height: '30px',
    border: `0.5px solid ${state.hasValue ? COLORS.shrub : COLORS.midgray}`,
    backgroundColor: state.isDisabled
      ? COLORS.lightgray
      : state.hasValue
        ? COLORS.shrub
        : '#fff',
    padding: '8px 14px',
    minWidth: $isSmall ? '93px' : '150px',
    width: 'max-content',
  }),
  // placeholder text
  placeholder: baseStyles => ({
    ...baseStyles,
    padding: '0px',
    margin: 'auto',
    // style as a P3 with fontWeight 400
    color: COLORS.midgray,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fontSize: useMediaQuery(device.lg) ? '0.875rem' : '0.75rem',

    fontWeight: 400,
  }),
  // hide vertical bar between arrow and text
  indicatorSeparator: baseStyles => ({
    ...baseStyles,
    display: 'none',
  }),
  // 'x' to clear selected option(s)
  clearIndicator: baseStyles => ({
    ...baseStyles,
    padding: '0px',
  }),
  // dropdown arrow
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    padding: '0px',
    marginLeft: '-4px', // move the dropdown indicator to the left, cant override text styles
    color: state.hasValue ? '#fff' : COLORS.midgray,
  }),
  // selected option display text
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    border: '0px',
    padding: '0px',
    margin: '0px',
    paddingLeft: '0px',
    // style as a P3 with fontWeight 400
    color: state.hasValue ? `#fff` : `${COLORS.black}`, // replace with `#fff`?
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fontSize: useMediaQuery(device.lg) ? '0.875rem' : '0.75rem',
    fontWeight: 400,
  }),
  option: baseStyles => ({
    ...baseStyles,
    // style as a P3 with fontWeight 400
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fontSize: useMediaQuery(device.lg) ? '0.875rem' : '0.75rem',
    fontWeight: 400,
  }),
});
