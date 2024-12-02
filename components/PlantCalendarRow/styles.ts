import styled from 'styled-components';

export const PlantCalendarRowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  flex-direction: row;
  gap: 8px;
`;

export const PlantText = styled.p`
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-size: 0.625rem;
  min-width: 10%;
  max-width: 10%;
  word-wrap: break-word;
  align-self: center;
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

export const CalendarCell = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
  background-clip: padding-box;
`;
