import React, { memo, useMemo } from 'react';
import COLORS from '@/styles/colors';
import { fillCalendarGridArrayRowWithColor } from '@/utils/helpers';
import { MonthHeader } from '../PlantCalendarList';
import SeasonColorKey from '../SeasonColorKey';
import { CalendarCell, CalendarGrid } from './styles';

interface PlantCalendarRowProps {
  harvestStart: string;
  harvestEnd: string;
  transplantStart: string;
  transplantEnd: string;
  indoorsStart: string;
  indoorsEnd: string;
  outdoorsStart: string;
  outdoorsEnd: string;
  singleDisplay?: boolean;
  // singleDisplay will include the ColorKey + MonthHeader
  // only used for PlantPages
}

const PlantCalendarRow = memo(function PlantCalendarRow({
  harvestStart,
  harvestEnd,
  transplantStart,
  transplantEnd,
  indoorsStart,
  indoorsEnd,
  outdoorsStart,
  outdoorsEnd,
  singleDisplay = false,
}: PlantCalendarRowProps) {
  // translate all the starts and ends to corresponding colours in an array
  const CalendarGridArray: string[] = useMemo(() => {
    // 4 rows, 24 columns = 96 cells
    let returnArray: string[] = new Array(96);
    // fill with grey
    returnArray.fill(COLORS.lightgray, 0, returnArray.length);
    // fill array in order of indoors -> outdoors -> transplant -> harvest
    returnArray = fillCalendarGridArrayRowWithColor(
      indoorsStart,
      indoorsEnd,
      COLORS.indoors,
      0,
      returnArray,
    );
    returnArray = fillCalendarGridArrayRowWithColor(
      outdoorsStart,
      outdoorsEnd,
      COLORS.outdoors,
      1,
      returnArray,
    );
    returnArray = fillCalendarGridArrayRowWithColor(
      transplantStart,
      transplantEnd,
      COLORS.transplant,
      2,
      returnArray,
    );
    returnArray = fillCalendarGridArrayRowWithColor(
      harvestStart,
      harvestEnd,
      COLORS.harvest,
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
    <>
      {singleDisplay && (
        <>
          <SeasonColorKey />
          <MonthHeader />
        </>
      )}
      <CalendarGrid>
        {CalendarGridArray.map((color, index) => (
          <CalendarCell key={index} $color={color} />
        ))}
      </CalendarGrid>
    </>
  );
});

export default PlantCalendarRow;
