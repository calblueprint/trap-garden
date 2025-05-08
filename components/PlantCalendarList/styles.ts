import styled from 'styled-components';
import { device } from '@/styles/breakpoints';
import { P3 } from '@/styles/text';

// Container for the table to handle overflow
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; // Allow horizontal scrolling
`;

// Styled Table
export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
`;

// Make the plant_name sticky
export const StickyTd = styled(P3).attrs({
  as: 'td',
})`
  width: auto;
  @media ${device.lg} {
    width: 40px;
  }
  position: sticky;
  left: 0;
  background-color: white; // Optional: Adds a background color to keep text visible when scrolling
  z-index: 1; // Ensures the sticky header is on top of other content
  padding-right: 16px;
`;

// Scrollable container for PlantCalendarRow
export const ScrollableTd = styled.td`
  // overflow-x: scroll;
  width: inherit;
  padding-bottom: 8px;

  @media ${device.lg} {
    padding-bottom: 16px;
  }
`;

// Scrollable container for Month Header (but not working as expected)
export const MonthScrollableTd = styled.td`
  position: sticky;
  top: 0;
  background-color: white;
  padding-bottom: 8px;

  @media ${device.lg} {
    padding-bottom: 16px;
  }
`;

// month header at the top of PlantCalendarList
export const MonthsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.75rem;
  width: 100%;
  justify-items: center;
`;

export const HeaderText = styled.div`
  font-size: 0.75rem;
  @media ${device.lg} {
    font-size: 0.875rem;
  }
`;
