import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const FilterDropdownInput = styled.select<{ hasValue: boolean }>`
  border-radius: 60px;
  padding: 8px 14px 8px 14px;
  gap: 2px;
  text-align: center;
  background-color: ${({ hasValue }) => (hasValue ? COLORS.shrub : '#fff')};
  color: ${({ hasValue }) => (hasValue ? '#fff' : '#000')};
`;
