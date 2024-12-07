import {
  DropdownOption,
  Plant,
  PlantingTypeEnum,
  SeasonEnum,
  SunlightEnum,
} from '@/types/schema';

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/* Helper function to process late/early month fields
Assumes that month is not null. 
Assumes that the month is a valid month string; 
otherwise, returns all-caps version of the input 
Returns all-caps month, without the LATE_ or EARLY_ prefix
*/
function processPlantMonth(month: string) {
  if (month.startsWith('LATE')) {
    return month.substring(5).toLocaleUpperCase();
  } else if (month.startsWith('EARLY')) {
    return month.substring(6).toLocaleUpperCase();
  } else {
    return month.toLocaleUpperCase();
  }
}

// helper constants for processing months to indexes
const growingSeasonToIndex = new Map<SeasonEnum, number[]>([
  ['SPRING', [2, 3, 4]],
  ['SUMMER', [5, 6, 7]],
  ['FALL', [8, 9, 10]],
  ['WINTER', [11, 0, 1]],
]);

const monthToIndex = new Map<string, number>([
  ['JANUARY', 0],
  ['FEBRUARY', 1],
  ['MARCH', 2],
  ['APRIL', 3],
  ['MAY', 4],
  ['JUNE', 5],
  ['JULY', 6],
  ['AUGUST', 7],
  ['SEPTEMBER', 8],
  ['OCTOBER', 9],
  ['NOVEMBER', 10],
  ['DECEMBER', 11],
]);

// TODO: Simplify this function using monthToSeason
// Helper function to check if selected growing season(s) match plant's growing_season
export function checkGrowingSeason(
  growingSeasonFilterValue: DropdownOption<SeasonEnum>[],
  plant: Plant,
) {
  // Automatically returns true if selected growing season is []
  if (growingSeasonFilterValue.length === 0) {
    return true;
  }

  // For each growingSeason selected, collect the valid indexes (months)
  let validIndexes: number[] = [];
  for (const growingSeason of growingSeasonFilterValue) {
    validIndexes = validIndexes.concat(
      growingSeasonToIndex.get(growingSeason.value)!,
    );
  }

  const isInRange = (start: number, end: number, validIndexes: number[]) => {
    // Checks if the start and end months are within the valid range
    if (start <= end) {
      return validIndexes.some(index => index >= start && index <= end);
    } else {
      // Handle wrap-around case (e.g. NOVEMBER to FEBRUARY)
      return validIndexes.some(index => index >= start || index <= end);
    }
  };

  // Handle late/early month logic
  // Set late/early month to just the month using processPlantMonth
  const indoorsStart =
    plant.indoors_start && processPlantMonth(plant.indoors_start);
  const indoorsEnd = plant.indoors_end && processPlantMonth(plant.indoors_end);
  const outdoorsStart =
    plant.outdoors_start && processPlantMonth(plant.outdoors_start);
  const outdoorsEnd =
    plant.outdoors_end && processPlantMonth(plant.outdoors_end);

  // Checks if either indoor_start to indoor_end or outdoor_start to outdoor_end
  // is within the valid range of months
  // exclamation marks to assert values are not undefined
  return (
    isInRange(
      monthToIndex.get(indoorsStart!)!,
      monthToIndex.get(indoorsEnd!)!,
      validIndexes!,
    ) ||
    isInRange(
      monthToIndex.get(outdoorsStart!)!,
      monthToIndex.get(outdoorsEnd!)!,
      validIndexes!,
    )
  );
}

// Helper function to check if selected harvest season(s) match plant's harvest_season
export function checkHarvestSeason(
  harvestSeasonFilterValue: DropdownOption[],
  plant: Plant,
) {
  // Automatically returns true if selected harvestSeason is []
  if (harvestSeasonFilterValue.length === 0) {
    return true;
  }

  return harvestSeasonFilterValue.some(
    harvestSeason => plant.harvest_season === harvestSeason.value,
  );
}

// Helper function to check if selected planting type(s) match plant's planting_type
export function checkPlantingType(
  plantingTypeFilterValue: DropdownOption<PlantingTypeEnum>[],
  plant: Plant,
) {
  // Automatically returns true if selected plantingType is []
  if (plantingTypeFilterValue.length === 0) {
    return true;
  }

  // if X_start is not null, then the plant matches plantingType X
  return plantingTypeFilterValue.some(
    plantingType =>
      (plantingType.value === 'INDOORS' && plant.indoors_start) ||
      (plantingType.value === 'OUTDOORS' && plant.outdoors_start) ||
      (plantingType.value === 'TRANSPLANT' && plant.transplant_start),
  );
}

export function checkSearchTerm(searchTerm: string, plant: Plant) {
  // Automatically returns true if searchTerm is ''
  if (searchTerm === '') {
    return true;
  }

  // Process searchTerm to remove leading and trailing spaces
  searchTerm = searchTerm.trim();

  // Check if plant_name contains searchTerm
  return plant.plant_name.toLowerCase().includes(searchTerm.toLowerCase());
}

/* Maps sunlight hours to SunlightEnum for display. Only considers sunlightMinHours.
Assumes sunlightMinHours between 0-8. SunlightEnum ranges are as follows (left-inclusive):
SHADE: [0, 2), PARTIAL_SUN: [2, 4), PARTIAL_SUN: [4, 6), FULL: [6, infin)
*/
function mapHoursToSunlightEnum(sunlightMinHours: number): SunlightEnum {
  if (sunlightMinHours < 2) return 'SHADE';
  if (sunlightMinHours < 4) return 'PARTIAL_SHADE';
  if (sunlightMinHours < 6) return 'PARTIAL_SUN';
  else return 'FULL';
}

const SunlightEnumDisplayMap: Record<SunlightEnum, string> = {
  SHADE: 'Shade',
  PARTIAL_SHADE: 'Partial Shade',
  PARTIAL_SUN: 'Partial Sun',
  FULL: 'Full Sun',
};

export function displaySunlightEnumFromHours(sunlightMinHours: number): string {
  return SunlightEnumDisplayMap[mapHoursToSunlightEnum(sunlightMinHours)];
}

export function checkSunlight(
  sunlightFilterValue: DropdownOption<SunlightEnum>[],
  plant: Plant,
) {
  // Automatically returns true if no selected sunlight
  if (sunlightFilterValue.length === 0) {
    return true;
  }

  const sunlightToHours: Record<SunlightEnum, [number, number]> = {
    SHADE: [0, 2],
    PARTIAL_SHADE: [2, 4],
    PARTIAL_SUN: [4, 6],
    FULL: [6, Number.MAX_VALUE],
  };

  const plantMin = plant.sunlight_min_hours;
  const plantMax = plant.sunlight_max_hours || plant.sunlight_min_hours;

  // For each sunlight selected, check if plant's min_hours and max_hours are
  // within that enum's range, return true if so
  return sunlightFilterValue.some(sunlight => {
    const [minHours, maxHours] = sunlightToHours[sunlight.value];
    return plantMin >= minHours && plantMax <= maxHours;
  });
}

export function checkDifficulty(
  difficultyFilterValue: DropdownOption[],
  plant: Plant,
) {
  // Automatically returns true if no selected difficulty
  if (difficultyFilterValue.length === 0) {
    return true;
  }

  // For each difficulty selected check if plant's difficulty_level matches difficulty
  // If it does, return true
  for (const difficulty of difficultyFilterValue) {
    if (plant.difficulty_level === difficulty.value) {
      return true;
    }
  }

  // Return false if no matches found
  return false;
}

export function checkUsState(usStateFilterValue: string, plant: Plant) {
  // Automatically returns true if no selected usState
  // Check if plant's us_state matches usStateFilterValue
  return usStateFilterValue === '' || plant.us_state === usStateFilterValue;
}

export function useTitleCase(text: string) {
  return text.charAt(0) + text.slice(1).toLowerCase();
}

export function formatTimestamp(timestamp: string): string {
  // Convert the input to a Date object
  const date = new Date(timestamp);

  // Extract the month, day, and year
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  // Return in MM/DD/YYYY format
  return `${month}/${day}/${year}`;
}

const monthToSeason: Record<string, SeasonEnum> = {
  JANUARY: 'WINTER',
  FEBRUARY: 'WINTER',
  MARCH: 'SPRING',
  APRIL: 'SPRING',
  MAY: 'SPRING',
  JUNE: 'SUMMER',
  JULY: 'SUMMER',
  AUGUST: 'SUMMER',
  SEPTEMBER: 'FALL',
  OCTOBER: 'FALL',
  NOVEMBER: 'FALL',
  DECEMBER: 'WINTER',
};

/* Maps a month to a season 
if valid month (e.g. 'LATE_JANUARY' or 'FEBRUARY'), return SeasonEnum
else return null*/
export function mapMonthToSeason(month: string): SeasonEnum | null {
  month = processPlantMonth(month).toUpperCase();
  return monthToSeason[month] || null;
}

export function fillCalendarGridArrayRowWithColor(
  startMonth: string | null,
  endMonth: string | null,
  color: string,
  rowIndex: number,
  gridArray: string[],
) {
  // if startMonth is null (assume endMonth also null), row should be empty
  // occurs when plant cannot be planted indoors and/or transplanted
  if (!startMonth) {
    return gridArray;
  }

  // if endMonth is null, it is set to startMonth (occurs when duration is only one month)
  // startMonth is assumed to not be null in this case
  // this makes the time frame only one month long
  if (!endMonth) {
    endMonth = startMonth;
  }

  // remove 'LATE' or 'EARLY' from startMonth and endMonth to query monthToIndex
  const processedStartMonth = processPlantMonth(startMonth);
  const processedEndMonth = processPlantMonth(endMonth);

  // if the start month is LATE_MONTH, start column should be the second column for that month
  // if the end month is EARLY_MONTH, end column should be the first column for that month
  // otherwise, start column should be the first column and end column should be the second column for that month
  const startColumn = startMonth!.startsWith('LATE')
    ? monthToIndex.get(processedStartMonth!)! * 2 + 1
    : monthToIndex.get(processedStartMonth!)! * 2;
  const endColumn = endMonth!.startsWith('EARLY')
    ? monthToIndex.get(processedEndMonth!)! * 2
    : monthToIndex.get(processedEndMonth!)! * 2 + 1;

  // fill gridArray with corresponding colour from startColumn to endColumn
  if (startColumn > endColumn) {
    // handle case when the season goes from November - February, e.g.
    for (let i = startColumn; i < 24; i++) {
      gridArray[rowIndex * 24 + i] = color;
    }
    for (let i = 0; i <= endColumn; i++) {
      gridArray[rowIndex * 24 + i] = color;
    }
  } else {
    // fill normally
    for (let i = startColumn; i <= endColumn; i++) {
      gridArray[rowIndex * 24 + i] = color;
    }
  }

  return gridArray;
}
