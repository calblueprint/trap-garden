import styled from 'styled-components';
import { P3 } from '@/styles/text';

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
  // TODO: make this more compact
  width: auto;
  position: sticky;
  left: 0;
  background-color: white; // Optional: Adds a background color to keep text visible when scrolling
  z-index: 1; // Ensures the sticky header is on top of other content
`;

// Scrollable container for PlantCalendarRow
export const ScrollableTd = styled.td`
  overflow-x: scroll;
  padding-bottom: 8px;
  // maybe replace with 4px above and below to center padding?
`;
