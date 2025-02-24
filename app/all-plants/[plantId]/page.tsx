'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UUID } from 'crypto';
import { getPlantById } from '@/api/supabase/queries/plants';
import { Plant } from '@/types/schema';

export default function GeneralPlantPage() {
  const params = useParams();
  const plantId: UUID = params.plantId as UUID;
  const [currentPlant, setCurrentPlant] = useState<Plant>();
  useEffect(() => {
    const getPlant = async () => {
      const plant = await getPlantById(plantId);
      setCurrentPlant(plant);
    };
    getPlant();
  }, [plantId]);
  return (
    <div>
      {currentPlant && (
        <div>
          <h3>{JSON.stringify(currentPlant)}</h3>
        </div>
      )}
    </div>
  );
}
