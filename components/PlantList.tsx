import React, { useEffect, useState } from 'react';
import { getAllPlants } from '@/api/supabase/queries/plants';
import { Plant } from '@/types/schema';

interface PlantListProps {
  harvestSeason: string;
  plantingType: string;
  growingSeason: string;
}

export const PlantList = ({
  harvestSeason,
  plantingType,
  growingSeason,
}: PlantListProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const growingSeasonToMonth = new Map<string, string[]>([
    ['Spring', ['MARCH', 'APRIL', 'MAY']],
    ['Summer', ['JUNE', 'JULY', 'AUGUST']],
    ['Fall', ['SEPTEMBER', 'OCTOBER', 'NOVEMBER']],
    ['Winter', ['DECEMBER', 'JANUARY', 'FEBRUARY']],
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

  const checkGrowingSeason = (plant: Plant) => {
    if (!growingSeason) {
      return true;
    }

    const months = growingSeasonToMonth.get(growingSeason);

    return (
      months?.includes(plant.indoors_start) ||
      months?.includes(plant.indoors_end) ||
      months?.includes(plant.outdoors_start) ||
      months?.includes(plant.outdoors_end)
    );
  };

  const checkHarvestSeason = (plant: Plant) => {
    return (
      !harvestSeason ||
      plant.harvest_season === harvestSeason.toLocaleUpperCase()
    );
  };

  const checkPlantingType = (plant: Plant) => {
    if (!plantingType) {
      return true;
    }

    if (plantingType === 'Start Seeds Indoors') {
      return plant.indoors_start !== null;
    } else if (plantingType === 'Start Seeds Outdoors') {
      return plant.outdoors_start !== null;
    } else if (plantingType === 'Plant Seedlings/Transplant Outdoors') {
      return plant.transplant_start !== null;
    }
  };

  const filterPlantList = (plant: Plant) => {
    return (
      checkGrowingSeason(plant) &&
      checkHarvestSeason(plant) &&
      checkPlantingType(plant)
    );
  };

  return (
    <div>
      {plants.filter(filterPlantList).map((plant, key) => (
        <div key={key}>{plant.plant_name}</div>
      ))}
    </div>
  );
};
