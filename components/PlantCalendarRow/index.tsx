import React from 'react';
import {
  CalendarCell,
  CalendarGrid,
  PlantCalendarRowContainer,
  PlantText,
} from './styles';

interface PlantCalendarRowProps {
  plantName?: string;
  harvestStart: string;
  harvestEnd: string;
  transplantStart: string;
  transplantEnd: string;
  indoorsStart: string;
  indoorsEnd: string;
  outdoorsStart: string;
  outdoorsEnd: string;
  showMonths: boolean;
}

export default function PlantCalendarRow({
  plantName,
  harvestStart,
  harvestEnd,
  transplantStart,
  transplantEnd,
  indoorsStart,
  indoorsEnd,
  outdoorsStart,
  outdoorsEnd,
  showMonths,
}: PlantCalendarRowProps) {
  // translate all the starts and ends to corresponding colours in an array
  const CalendarGridArray = [
    '#F5B868',
    '#F5B868',
    '#F5B868',
    '#F5B868',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
  ];

  return (
    <PlantCalendarRowContainer>
      <PlantText>{plantName}</PlantText>
      <CalendarGrid>
        {CalendarGridArray.map((color, index) => (
          <CalendarCell key={index} color={color} />
        ))}
      </CalendarGrid>
    </PlantCalendarRowContainer>
  );
}
