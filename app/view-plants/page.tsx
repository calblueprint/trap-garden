'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { getPlantById } from '@/api/supabase/queries/plant_by_id';
import PlantCard from '@/components/PlantCard/PlantCard';
import { Plant } from '@/types/schema';

export default function Home() {
  const [result, setResult] = useState<Plant>();
  async function fetchPlant(state: string, id: UUID) {
    const plant = await getPlantById(state, id);
    console.log(plant);
    return plant;
  }
  // const plant: Plant = {
  //   id: '3067b896-ba05-45b0-bb5c-e09277cf1e68',
  //   plant_name: 'tomato',
  //   state: 'tennessee',
  //   harvest_season: 'SPRING',
  //   water_num_times_per_week: 7,
  //   plant_seed_indoors_start: 'January',
  //   plant_seed_indoors_end: 'February',
  //   plant_seed_outdoors_start: 'March',
  //   plant_seed_outdoors_end: 'April',
  //   plant_transplant_start: 'April',
  //   plant_transplant_end: 'May',
  //   harvest_start: 'April',
  //   harvest_end: 'May',
  //   water_inches_per_week: 7,
  //   harvest_days_after_plant: 5,
  //   sunlight_required: 'Yes',
  //   beginner_friendly: true,
  //   plant_tips: 'aerg',
  // };
  useEffect(() => {
    const getData = async () => {
      const testState: string = 'Tennessee';
      const testUUID: UUID = '43c19f80-8205-4d03-b323-05c220550bf0';
      const plant2 = await fetchPlant(testState, testUUID);
      setResult(plant2); // Set the result to state
    };

    getData(); // Call the async function when the component mounts
  }, []);
  if (result === undefined) {
    return <div>Loading...</div>;
  } else {
    return <PlantCard plant={result} />;
  }
  // return (
  //   <div>

  //     <PlantCard plant={plant}/>
  //
  //   </div>
  // );
}
