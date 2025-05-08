import styled from 'styled-components';
import { device } from '@/styles/breakpoints';

export const PlantCalendarRowContainer = styled.tr`
  &:hover {
    cursor: pointer;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  position: sticky;
  min-width: 272px;
  height: 30px;
  @media ${device.lg} {
    height: 56px;
  }
  width: 100%;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1px;
  background-color: white;
`;

export const CalendarCell = styled.div<{ $color: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ $color }) => $color};
  background-clip: padding-box;
`;

export const SingleDisplayScrollContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  scrollbar-width: none;
  overscroll-behavior: none;
`;

// for single display to handle scrolling
export const StyledTable = styled.table`
  overflow-x: scroll;
  width: 100%;
  min-width: 400px;
  border-spacing: 0;
  border-collapse: separate;
`;

export const ScrollableTd = styled.td`
  overflow-x: scroll;
  width: inherit;
  display: block;
  padding-bottom: 8px;
`;
