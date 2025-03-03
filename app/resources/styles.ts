import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const ViewSelection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 3rem;
  padding-bottom: 1rem;
`;

export const HeaderButton = styled.button<{
  $isCurrentMode: boolean;
}>`
  background: none;
  border: none;
  color: ${COLORS.shrub};
  font-family: inherit;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 1rem;
  color: ${({ $isCurrentMode }) =>
    $isCurrentMode ? ` ${COLORS.shrub}` : `${COLORS.midgray}`};
  border-bottom: ${({ $isCurrentMode }) =>
    $isCurrentMode ? `solid ${COLORS.shrub}` : undefined};
`;
