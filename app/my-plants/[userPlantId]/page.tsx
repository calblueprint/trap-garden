'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UUID } from 'crypto';
import { getMatchingPlantForUserPlants } from '@/api/supabase/queries/plants';
import { getUserPlantById } from '@/api/supabase/queries/userPlants';
import { Plant, UserPlants } from '@/types/schema';

export default function UserPlantPage() {
  const params = useParams();
  const userPlantId: UUID = params.userPlantId as UUID;
  const [currentPlant, setCurrentPlant] = useState<Plant>();
  const [currentUserPlant, setCurrentUserPlant] = useState<UserPlants>();
  useEffect(() => {
    const getPlant = async () => {
      const userPlant = await getUserPlantById(userPlantId);
      setCurrentUserPlant(userPlant);
      const plant = await getMatchingPlantForUserPlants(userPlant);
      setCurrentPlant(plant);
      // const plant = await getPlantById(await getUserPlantById(userPlantId))
      // setCurrentPlant(plant)
    };
    getPlant();
  }, [userPlantId]);
  return (
    <div>
      {currentPlant && (
        <div>
          <h3>{JSON.stringify(currentUserPlant)}</h3>
          <h3>{JSON.stringify(currentPlant)}</h3>
        </div>
      )}
    </div>
  );
}
