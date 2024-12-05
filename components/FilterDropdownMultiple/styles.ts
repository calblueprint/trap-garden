import { StylesConfig } from 'react-select';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { DropdownOption } from '@/types/schema';

export const StyledOption = styled.div`
  display: flex;
  align-items: center;
`;

// custom styles for react-select component
export const customSelectStyles: StylesConfig<DropdownOption<any>, true> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: '57px',
    border: `0.5px solid ${COLORS.midgray}`,
    backgroundColor: state.isDisabled ? COLORS.lightgray : '#fff',
    padding: '8px 14px',
    color: COLORS.midgray,
  }),
  placeholder: baseStyles => ({
    ...baseStyles,
    color: COLORS.midgray,
    fontSize: '0.75rem',
    padding: '0px',
    margin: '0px',
  }),
  input: baseStyles => ({
    ...baseStyles,
    margin: '0px',
    padding: '0px',
  }),
  // hide vertical bar between arrow and text
  indicatorSeparator: baseStyles => ({
    ...baseStyles,
    display: 'none',
  }),
  clearIndicator: baseStyles => ({
    ...baseStyles,
    padding: '0px',
  }),
  dropdownIndicator: baseStyles => ({
    ...baseStyles,
    padding: '0px',
    marginLeft: '-4px', // move the dropdown indicator to the left cant override text styles
    color: COLORS.midgray,
  }),
  multiValue: baseStyles => ({
    ...baseStyles,
    backgroundColor: '#fff',
    border: '0px',
    padding: '0px',
    margin: '0px',
  }),
  multiValueLabel: baseStyles => ({
    ...baseStyles,
    fontSize: '0.75rem',
    color: `${COLORS.midgray} !important`,
    padding: '0px',
    paddingLeft: '0px',
  }),
  multiValueRemove: baseStyles => ({
    ...baseStyles,
    display: 'none',
  }),
};
