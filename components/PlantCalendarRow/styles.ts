import styled from 'styled-components';

export const PlantCalendarRowContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 12fr;
  gap: 12px;
`;

export const PlantText = styled.p`
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CalendarGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(4, 12px);
  gap: 1px;
  background-color: white;
`;

export const CalendarCell = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
  background-clip: padding-box;
`;
