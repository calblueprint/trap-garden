import React, { useEffect, useState } from 'react';
import { getPlantSeasonality } from '@/api/supabase/queries/plantSeasonality';
import { Plant } from '@/types/schema';

interface PlantListProps {
  growing_season: string;
  harvest_season: string;
  planting_type: string;
}

export const PlantList = (props: PlantListProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchPlantSeasonality = async () => {
      const plantList = await getPlantSeasonality('TENNESSEE');
      setPlants(plantList);
    };

    fetchPlantSeasonality();
  }, []);

  return (
    <div>
      {plants.map((plant, key) => (
        <div key={key}>{plant.plant_name}</div>
      ))}
    </div>
  );
};
