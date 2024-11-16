import styled, { css } from 'styled-components';
import COLORS from '@/styles/colors';

interface SelectedProps {
  $isSelected: boolean;
}

export const ComponentContainer = styled.button<SelectedProps>`
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
  border-color: ${({ $isSelected }) =>
    $isSelected ? COLORS.shrub : COLORS.lightgray};
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: ${COLORS.sproutLight};
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
  color: ${({ $isSelected }) => ($isSelected ? COLORS.shrub : COLORS.midgray)};
  font-size: 1.25rem;
`;
