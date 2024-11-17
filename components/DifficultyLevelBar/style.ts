import styled from 'styled-components';

export const IndicatorContainer = styled.div`
  display: flex;
  gap: 2px;
`;

export const Bar = styled.div<{
  active: boolean;
  color: string;
  position: 'left' | 'middle' | 'right';
}>`
  width: 16px;
  height: 10px;
  background-color: ${({ active, color }) => (active ? color : '#e0e0e0')};
  border-radius: ${({ position }) =>
    position === 'left'
      ? '8px 0 0 8px'
      : position === 'right'
        ? '0 8px 8px 0'
        : '0'};
`;
