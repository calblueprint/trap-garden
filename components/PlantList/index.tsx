import React, { useEffect, useMemo, useState } from 'react';
import { getAllPlants } from '@/api/supabase/queries/plants';
import { DropdownOption, Plant } from '@/types/schema';
import {
  checkGrowingSeason,
  checkHarvestSeason,
  checkPlantingType,
  checkSearchTerm,
} from '@/utils/helpers';
import MonthHeader from '../MonthHeader';
import PlantCalendarRow from '../PlantCalendarRow';
import { CalendarRowsContainer } from './styles';

interface PlantListProps {
  harvestSeasonFilterValue: DropdownOption[];
  plantingTypeFilterValue: DropdownOption[];
  growingSeasonFilterValue: DropdownOption[];
  usStateFilterValue: string;
  searchTerm: string;
}

export const PlantList = ({
  harvestSeasonFilterValue,
  plantingTypeFilterValue,
  growingSeasonFilterValue,
  usStateFilterValue,
  searchTerm,
}: PlantListProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchPlantSeasonality = async () => {
      const plantList = await getAllPlants();
      const us_state = usStateFilterValue;
      const filteredPlantList = plantList.filter(
        plant => plant.us_state === us_state,
      );
      const sortedAndFilteredPlantList = filteredPlantList.sort((a, b) =>
        a.plant_name.localeCompare(b.plant_name),
      );
      setPlants(sortedAndFilteredPlantList);
    };

    fetchPlantSeasonality();
  }, [usStateFilterValue]);

  const filteredPlantList = useMemo(() => {
    return plants.filter(
      plant =>
        checkGrowingSeason(growingSeasonFilterValue, plant) &&
        checkHarvestSeason(harvestSeasonFilterValue, plant) &&
        checkPlantingType(plantingTypeFilterValue, plant) &&
        checkSearchTerm(searchTerm, plant),
    );
  }, [
    plants,
    growingSeasonFilterValue,
    harvestSeasonFilterValue,
    plantingTypeFilterValue,
    searchTerm,
  ]);

  return (
    <div>
      <MonthHeader />
      <CalendarRowsContainer>
        {filteredPlantList.map((plant, key) => (
          //this should display PlantCalendarRows instead of this temporary div
          <PlantCalendarRow
            key={key}
            plantName={plant.plant_name}
            harvestStart={plant.harvest_start}
            harvestEnd={plant.harvest_end}
            transplantStart={plant.transplant_start}
            transplantEnd={plant.transplant_end}
            indoorsStart={plant.indoors_start}
            indoorsEnd={plant.indoors_end}
            outdoorsStart={plant.outdoors_start}
            outdoorsEnd={plant.outdoors_end}
          />
        ))}
      </CalendarRowsContainer>
    </div>
  );
};
