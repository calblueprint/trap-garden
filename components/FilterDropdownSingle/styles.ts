import { StylesConfig } from 'react-select';
import styled from 'styled-components';
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
    borderRadius: '57px',
    border: `0.5px solid ${COLORS.midgray}`,
    backgroundColor: state.isDisabled ? COLORS.lightgray : '#fff',
    padding: '8px 14px',
    color: COLORS.midgray,
    // if small is true, set min width to 150px, if undefined don't set min width
    ...($isSmall && { minWidth: '150px' }),
  }),
  // placeholder text
  placeholder: baseStyles => ({
    ...baseStyles,
    color: COLORS.midgray,
    fontSize: '0.75rem',
    padding: '0px',
    margin: '0px',
    justifySelf: 'center',
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
  dropdownIndicator: baseStyles => ({
    ...baseStyles,
    padding: '0px',
    marginLeft: '-4px', // move the dropdown indicator to the left, cant override text styles
    color: COLORS.midgray,
  }),
  // selected option display text
  singleValue: baseStyles => ({
    ...baseStyles,
    backgroundColor: '#fff',
    border: '0px',
    padding: '0px',
    margin: '0px',
    fontSize: '0.75rem',
    color: `${COLORS.black} !important`,
    paddingLeft: '0px',
  }),
});
