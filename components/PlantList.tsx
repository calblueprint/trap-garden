import React, { useEffect, useState } from 'react';
import { getAllPlants } from '@/api/supabase/queries/plants';
import { Plant } from '@/types/schema';

interface PlantListProps {
  harvest_season: string;
  planting_type: string;
  growing_season: string;
}

export const PlantList = (props: PlantListProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const growingSeasonToMonth = new Map<string, string[]>([
    ['Spring', ['March', 'April', 'May']],
    ['Summer', ['June', 'July', 'August']],
    ['Fall', ['September', 'October', 'November']],
    ['Winter', ['December', 'January', 'February']],
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
    if (!props.growing_season) {
      return true;
    }

    const months = growingSeasonToMonth.get(props.growing_season);

    return (
      months?.includes(plant.plant_seed_indoors_start) ||
      months?.includes(plant.plant_seed_indoors_end) ||
      months?.includes(plant.plant_seed_outdoors_start) ||
      months?.includes(plant.plant_seed_outdoors_end)
    );
  };

  const checkHarvestSeason = (plant: Plant) => {
    if (!props.harvest_season) {
      return true;
    }

    return plant.harvest_season === props.harvest_season.toLocaleUpperCase();
  };

  const checkPlantingType = (plant: Plant) => {
    if (!props.planting_type) {
      return true;
    }

    if (props.planting_type === 'Start Seeds Indoors') {
      return (
        plant.plant_seed_indoors_start !== null &&
        plant.plant_seed_indoors_start !== null
      );
    } else if (props.planting_type === 'Start Seeds Outdoors') {
      return (
        plant.plant_seed_outdoors_start !== null &&
        plant.plant_seed_outdoors_start !== null
      );
    } else if (props.planting_type === 'Plant Seedlings/Transplant Outdoors') {
      return (
        plant.plant_transplant_start !== null &&
        plant.plant_transplant_end !== null
      );
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
