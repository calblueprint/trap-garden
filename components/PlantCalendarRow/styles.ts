import styled from 'styled-components';

export const PlantCalendarRowContainer = styled.tr<{ $isSelected?: boolean }>`
  &:hover {
    cursor: pointer;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  min-width: 272px;
  height: 30px;
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
