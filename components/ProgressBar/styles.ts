import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const BackgroundDiv = styled.div`
  width: 100%;
  height: 0.375rem;
  background-color: ${COLORS.lightgray};
  position: relative;
`;

export const ProgressDiv = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}%;
  height: 0.375rem;
  border-radius: 3px;
  background-color: ${COLORS.shrub};
  top: 0;
  left: 0;
`;
