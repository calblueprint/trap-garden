import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P1 } from '@/styles/text';

interface SelectedProps {
  $isSelected: boolean;
}

export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RadioButton = styled.button<SelectedProps>`
  display: flex;
  flex-direction: row;
  background-color: ${({ $isSelected }) =>
    $isSelected ? COLORS.sproutLight : 'white'};
  border: 1px solid transparent;
  border-radius: 8px;
  width: 345px;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  border-color: ${({ $isSelected }) =>
    $isSelected ? COLORS.shrub : COLORS.lightgray};
  font-family: inherit;
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  width: 20px;
  height: 20px;
  &:checked {
    accent-color: ${COLORS.shrub}; // Changes the radio fill color
  }
`;

export const RadioLabel = styled(P1).attrs({ as: 'label' })<SelectedProps>`
  color: ${({ $isSelected }) => ($isSelected ? COLORS.shrub : COLORS.midgray)};
`;
