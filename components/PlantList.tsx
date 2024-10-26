import React, { useEffect, useState } from 'react';
import { getAllPlants } from '@/api/supabase/queries/plants';
import { Plant } from '@/types/schema';
import { processPlantMonth } from '@/utils/helpers';

interface PlantListProps {
  harvestSeasonFilterValue: string;
  plantingTypeFilterValue: string;
  growingSeasonFilterValue: string;
}

export const PlantList = ({
  harvestSeasonFilterValue,
  plantingTypeFilterValue,
  growingSeasonFilterValue,
}: PlantListProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const growingSeasonToIndex = new Map<string, number[]>([
    ['Spring', [2, 3, 4]],
    ['Summer', [5, 6, 7]],
    ['Fall', [8, 9, 10]],
    ['Winter', [11, 0, 1]],
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

  useEffect(() => {
    const fetchPlantSeasonality = async () => {
      // gets plants in Tennessee by default
      const plantList = await getAllPlants();
      const us_state = 'TENNESSEE';
      const filteredPlantList = plantList.filter(
        plant => plant.us_state === us_state,
      );
      setPlants(filteredPlantList);
    };

    fetchPlantSeasonality();
  }, []);

  // Check if growingSeason matches the plant's growing season
  const checkGrowingSeason = (plant: Plant) => {
    // Automatically returns true if selected growing season is ''
    if (!growingSeasonFilterValue) {
      return true;
    }

    // list of valid indexes for the growing season
    // indexes are the months of the year
    const validIndexes = growingSeasonToIndex.get(growingSeasonFilterValue);

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
    let indoorsStart = processPlantMonth(plant.indoors_start);
    let indoorsEnd = processPlantMonth(plant.indoors_end);
    let outdoorsStart = processPlantMonth(plant.outdoors_start);
    let outdoorsEnd = processPlantMonth(plant.outdoors_end);

    // Checks if either indoor_start to indoor_end or outdoor_start to outdoor_end
    // is within the valid range
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
  };

  // Checks if harvestSeason matches the plant's harvest_season
  const checkHarvestSeason = (plant: Plant) => {
    // Automatically returns true if selected harvestSeason is ''
    return (
      !harvestSeasonFilterValue ||
      plant.harvest_season === harvestSeasonFilterValue.toLocaleUpperCase()
    );
  };

  // Checks if plantingType matches the plant's planting type
  const checkPlantingType = (plant: Plant) => {
    // Automatically returns true if selected plantingType is ''
    if (!plantingTypeFilterValue) {
      return true;
    }

    // Checking if corresponding start field in table is not null
    // according to plantingType selected
    if (plantingTypeFilterValue === 'Start Seeds Indoors') {
      return plant.indoors_start !== null;
    } else if (plantingTypeFilterValue === 'Start Seeds Outdoors') {
      return plant.outdoors_start !== null;
    } else if (
      plantingTypeFilterValue === 'Plant Seedlings/Transplant Outdoors'
    ) {
      return plant.transplant_start !== null;
    }
  };

  const filterPlantList = (plant: Plant) => {
    // Filters the plant list based on the selected filters
    // Only returns true if plant passes all checks
    return (
      checkGrowingSeason(plant) &&
      checkHarvestSeason(plant) &&
      checkPlantingType(plant)
    );
  };

  return (
    <div>
      {plants
        .filter(filterPlantList)
        .sort((a, b) => a.plant_name.localeCompare(b.plant_name))
        .map((plant, key) => (
          //this should display PlantCalendarRows instead of this temporary div
          <div key={key}>{plant.plant_name}</div>
        ))}
    </div>
  );
};
