'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { getPlantById } from '@/api/supabase/queries/plants';
import PlantCard from '@/components/PlantCard/PlantCard';
import { Plant } from '@/types/schema';

export default function Home() {
  const [result, setResult] = useState<Plant>();
  useEffect(() => {
    const getData = async () => {
      const testUUID: UUID = '010ae695-6cc8-4af4-919a-d15b92fdd68d';
      const plant2 = await getPlantById(testUUID);
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
