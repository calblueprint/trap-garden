import React, { useEffect, useState } from 'react';
import { getAllPlants } from '@/api/supabase/queries/plants';
import { DropdownOption, Plant } from '@/types/schema';
import {
  checkGrowingSeason,
  checkHarvestSeason,
  checkPlantingType,
} from '@/utils/helpers';

interface PlantListProps {
  harvestSeasonFilterValue: DropdownOption[];
  plantingTypeFilterValue: DropdownOption[];
  growingSeasonFilterValue: DropdownOption[];
  usStateFilterValue: string;
}

export const PlantList = ({
  harvestSeasonFilterValue,
  plantingTypeFilterValue,
  growingSeasonFilterValue,
  usStateFilterValue,
}: PlantListProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchPlantSeasonality = async () => {
      // gets plants in Tennessee by default
      const plantList = await getAllPlants();
      const us_state = usStateFilterValue.toLocaleUpperCase();
      const filteredPlantList = plantList.filter(
        plant => plant.us_state === us_state,
      );
      setPlants(filteredPlantList);
    };

    fetchPlantSeasonality();
  }, [usStateFilterValue]);

  const filterPlantList = (plant: Plant) => {
    // Filters the plant list based on the selected filters
    // Only returns true if plant passes all checks
    return (
      checkGrowingSeason(growingSeasonFilterValue, plant) &&
      checkHarvestSeason(harvestSeasonFilterValue, plant) &&
      checkPlantingType(plantingTypeFilterValue, plant)
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
