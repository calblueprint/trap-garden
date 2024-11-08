import styled, { css } from 'styled-components';
import COLORS from '@/styles/colors';

interface SelectedProps {
  isSelected: boolean;
}

export const ComponentContainer = styled.div<SelectedProps>`
  display: flex;
  flex-direction: row;
  gap: 0.9375rem;
  background-color: white;
  border: 0.125rem solid transparent;
  border-radius: 8px;
  width: 21rem;
  height: 3.1875rem;
  align-items: center;
  justify-content: space-between;
  padding-left: 1.188rem;
  padding-right: 1rem;
  margin-bottom: 1.125rem;
  ${({ isSelected }) =>
    isSelected &&
    css`
      border-color: ${COLORS.shrub}; // Changes border color when selected
      background-color: rgba(148, 181, 6, 0.1); //not added to color styles yet
    `}
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  width: 1.5625rem;
  height: 1.5625rem;
  &:checked {
    accent-color: ${COLORS.shrub}; // Changes the radio fill color
  }
`;
export const RadioLabel = styled.label<SelectedProps>`
  color: ${({ isSelected }) => (isSelected ? COLORS.shrub : COLORS.midgray)};
  font-size: 1.25rem;
`;
