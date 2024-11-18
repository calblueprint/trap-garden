import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const FilterDropdownInput = styled.select<{ hasValue: boolean }>`
  border-radius: 60px;
  padding: 8px 14px 8px 14px;
  align-items: center;
  justify-content: center;
  justify-items: center;
  gap: 2px;
  background-color: ${({ hasValue }) => (hasValue ? COLORS.shrub : '#fff')};
  color: ${({ hasValue }) => (hasValue ? '#fff' : '#000')};
`;
