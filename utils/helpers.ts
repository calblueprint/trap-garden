import { DropdownOption, Plant, SeasonEnum } from '@/types/schema';

// Helper function to process late/early month fields for checkGrowingSeason
function processPlantMonth(month: string) {
  // If field is not null and starts with 'LATE' or 'EARLY,
  // get substring after 'LATE_ or 'EARLY_'
  if (!month) {
    return month;
  }

  if (month.startsWith('LATE')) {
    return month.substring(5);
  } else if (month.startsWith('EARLY')) {
    return month.substring(6);
  } else {
    return month;
  }
}

// Helper function to check if selected growing season(s) match plant's growing_season
export function checkGrowingSeason(
  growingSeasonFilterValue: DropdownOption[],
  plant: Plant,
) {
  const growingSeasonToIndex = new Map<string, number[]>([
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
  const indoorsStart = processPlantMonth(plant.indoors_start);
  const indoorsEnd = processPlantMonth(plant.indoors_end);
  const outdoorsStart = processPlantMonth(plant.outdoors_start);
  const outdoorsEnd = processPlantMonth(plant.outdoors_end);

  // Checks if either indoor_start to indoor_end or outdoor_start to outdoor_end
  // is within the valid range of months
  // exclamation marks to assert values are not undefined
  return (
    isInRange(
      monthToIndex.get(indoorsStart)!,
      monthToIndex.get(indoorsEnd)!,
      validIndexes!,
    ) ||
    isInRange(
      monthToIndex.get(outdoorsStart)!,
      monthToIndex.get(outdoorsEnd)!,
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

  // For each harvestSeason selected, check if plant's harvest_season matches harvestSeason
  // If it does, add true to harvestSeasonBoolean
  const harvestSeasonBoolean: boolean[] = [];
  for (const harvestSeason of harvestSeasonFilterValue) {
    harvestSeasonBoolean.push(plant.harvest_season === harvestSeason.value);
  }

  // Return true if any of the harvestSeasonBooleans are true
  return harvestSeasonBoolean.includes(true);
}

// Helper function to check if selected planting type(s) match plant's planting_type
export function checkPlantingType(
  plantingTypeFilterValue: DropdownOption[],
  plant: Plant,
) {
  // Automatically returns true if selected plantingType is []
  if (plantingTypeFilterValue.length === 0) {
    return true;
  }

  // For each plantingType selected, check if corresponding start field in table is not null
  // If it is not null, add true to plantingTypeBoolean
  const plantingTypeBoolean: boolean[] = [];
  for (const plantingType of plantingTypeFilterValue) {
    if (plantingType.value === 'Start Seeds Indoors') {
      plantingTypeBoolean.push(plant.indoors_start !== null);
    } else if (plantingType.value === 'Start Seeds Outdoors') {
      plantingTypeBoolean.push(plant.outdoors_start !== null);
    } else if (plantingType.value === 'Plant Seedlings/Transplant Outdoors') {
      plantingTypeBoolean.push(plant.transplant_start !== null);
    }
  }

  // Return true if any of the plantingTypeBooleans are true
  return plantingTypeBoolean.includes(true);
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

export function checkSunlight(
  sunlightFilterValue: DropdownOption[],
  plant: Plant,
) {
  // Automatically returns true if no selected sunlight
  if (sunlightFilterValue.length === 0) {
    return true;
  }

  const sunlightToHours = new Map<string, [number, number]>([
    ['SHADE', [0, 2]],
    ['PARTIAL_SHADE', [2, 4]],
    ['PARTIAL_SUN', [4, 6]],
    ['FULL', [6, Number.MAX_VALUE]],
  ]);

  // For each sunlight selected, check if plant's min_hours and max_hours are
  // within that enum's range, return true if so
  for (const sunlight of sunlightFilterValue) {
    const [minHours, maxHours] = sunlightToHours.get(sunlight.value)!;
    // if max_hours is null then plant can only receive min_hours of sunlight
    if (plant.sunlight_max_hours === null) {
      if (
        plant.sunlight_min_hours >= minHours &&
        plant.sunlight_min_hours <= maxHours
      ) {
        return true;
      }
    } else if (
      plant.sunlight_min_hours >= minHours &&
      plant.sunlight_max_hours <= maxHours
    ) {
      return true;
    }
  }

  // Return false if no matches found
  return false;
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
