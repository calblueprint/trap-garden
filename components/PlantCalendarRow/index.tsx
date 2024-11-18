import React, { useMemo } from 'react';
import { fillCalendarGridArrayRowWithColor } from '@/utils/helpers';
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
}: PlantCalendarRowProps) {
  const colors = {
    indoors: '#F5B868',
    outdoors: '#89BF8D',
    transplant: '#8EDBFF',
    harvest: '#FBA7A7',
    background: '#D9D9D9',
  };

  // translate all the starts and ends to corresponding colours in an array
  const CalendarGridArray: string[] = useMemo(() => {
    // 4 rows, 24 columns = 96 cells
    let returnArray: string[] = new Array(96);
    // fill with grey
    returnArray.fill(colors.background, 0, returnArray.length);
    // fill array in order of indoors -> outdoors -> transplant -> harvest
    returnArray = fillCalendarGridArrayRowWithColor(
      indoorsStart,
      indoorsEnd,
      colors.indoors,
      0,
      returnArray,
    );
    returnArray = fillCalendarGridArrayRowWithColor(
      outdoorsStart,
      outdoorsEnd,
      colors.outdoors,
      1,
      returnArray,
    );
    returnArray = fillCalendarGridArrayRowWithColor(
      transplantStart,
      transplantEnd,
      colors.transplant,
      2,
      returnArray,
    );
    returnArray = fillCalendarGridArrayRowWithColor(
      harvestStart,
      harvestEnd,
      colors.harvest,
      3,
      returnArray,
    );

    return returnArray;
  }, [
    harvestStart,
    harvestEnd,
    transplantStart,
    transplantEnd,
    indoorsStart,
    indoorsEnd,
    outdoorsStart,
    outdoorsEnd,
  ]);

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
