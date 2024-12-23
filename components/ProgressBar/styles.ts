import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const BackgroundDiv = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${COLORS.lightgray};
  position: relative;
`;

export const ProgressDiv = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  border-radius: 3px;
  background-color: ${COLORS.shrub};
  top: 0;
  left: 0;
`;
