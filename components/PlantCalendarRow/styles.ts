import styled from 'styled-components';
import { P3 } from '@/styles/text';

export const PlantCalendarRowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  flex-direction: row;
  gap: 8px;
`;

export const PlantText = styled(P3)`
  max-width: 10%;
  min-width: 10%;
  word-wrap: break-word;
  align-self: center;
  /* position: sticky;
  left: 0; 
  z-index: 1; */
`;

export const CalendarGrid = styled.div`
  display: grid;
  min-width: 272px;
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
