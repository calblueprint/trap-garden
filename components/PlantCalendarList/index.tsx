import React, { useEffect, useMemo, useState } from 'react';
import { getAllPlants } from '@/api/supabase/queries/plants';
import {
  DropdownOption,
  Plant,
  PlantingTypeEnum,
  SeasonEnum,
} from '@/types/schema';
import {
  checkGrowingSeason,
  checkHarvestSeason,
  checkPlantingType,
  checkSearchTerm,
  checkUsState,
} from '@/utils/helpers';
import MonthHeader from '../MonthHeader';
import PlantCalendarRow from '../PlantCalendarRow';
import { CalendarRowsContainer } from './styles';

interface PlantListProps {
  harvestSeasonFilterValue: DropdownOption<SeasonEnum>[];
  plantingTypeFilterValue: DropdownOption<PlantingTypeEnum>[];
  growingSeasonFilterValue: DropdownOption<SeasonEnum>[];
  usStateFilterValue: string;
  searchTerm: string;
}

export const PlantCalendarList = ({
  harvestSeasonFilterValue,
  plantingTypeFilterValue,
  growingSeasonFilterValue,
  usStateFilterValue,
  searchTerm,
}: PlantListProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    (async () => {
      const plantList = await getAllPlants();
      const alphabeticalPlantList = plantList.sort((a, b) =>
        a.plant_name.localeCompare(b.plant_name),
      );
      setPlants(alphabeticalPlantList);
    })();
  }, []);

  const filteredPlantList = useMemo(() => {
    return plants.filter(
      plant =>
        checkGrowingSeason(growingSeasonFilterValue, plant) &&
        checkHarvestSeason(harvestSeasonFilterValue, plant) &&
        checkPlantingType(plantingTypeFilterValue, plant) &&
        checkSearchTerm(searchTerm, plant) &&
        checkUsState(usStateFilterValue, plant),
    );
  }, [
    plants,
    growingSeasonFilterValue,
    harvestSeasonFilterValue,
    plantingTypeFilterValue,
    searchTerm,
    usStateFilterValue,
  ]);

  return (
    <div>
      <MonthHeader />
      <CalendarRowsContainer>
        {filteredPlantList.map((plant, key) => (
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
