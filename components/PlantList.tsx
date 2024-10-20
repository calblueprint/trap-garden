import React, { useEffect, useState } from 'react';
import { getPlantSeasonality } from '@/api/supabase/queries/plantSeasonality';
import { Plant } from '@/types/schema';

export const PlantList = () => {
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
