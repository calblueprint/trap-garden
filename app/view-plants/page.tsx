'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { getPlantById } from '@/api/supabase/queries/plant_by_id';
import PlantCard from '@/components/PlantCard/PlantCard';
import { Plant } from '@/types/schema';

export default function Home() {
  const [result, setResult] = useState<Plant>();
  useEffect(() => {
    const getData = async () => {
      const testState: string = 'Tennessee';
      const testUUID: UUID = '185a3300-b0fc-4383-8fb4-417737d77659';
      const plant2 = await getPlantById(testState, testUUID);
      setResult(plant2); // Set the result to state
    };

    getData(); // Call the async function when the component mounts
  }, []);
  if (result === undefined) {
    return <div>Loading...</div>;
  } else {
    return <PlantCard plant={result} />;
  }
}
