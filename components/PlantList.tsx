import React, { useEffect, useState } from 'react';
import { getAllPlants } from '@/api/supabase/queries/plants';
import { Plant } from '@/types/schema';

export const PlantList = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchPlantSeasonality = async () => {
      const plantList = await getAllPlants();
      const us_state = 'TENNESSEE';
      const filteredPlantList = plantList.filter(
        plant => plant.us_state === us_state,
      );
      setPlants(filteredPlantList);
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
