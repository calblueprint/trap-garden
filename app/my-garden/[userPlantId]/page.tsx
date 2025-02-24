'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UUID } from 'crypto';
import { getMatchingPlantForUserPlant } from '@/api/supabase/queries/plants';
import { getUserPlantById } from '@/api/supabase/queries/userPlants';
import { Plant, UserPlant } from '@/types/schema';

export default function UserPlantPage() {
  const params = useParams();
  const userPlantId: UUID = params.userPlantId as UUID;
  const [currentPlant, setCurrentPlant] = useState<Plant>();
  const [currentUserPlant, setCurrentUserPlant] = useState<UserPlant>();
  useEffect(() => {
    const getPlant = async () => {
      const userPlant = await getUserPlantById(userPlantId);
      setCurrentUserPlant(userPlant);
      const plant = await getMatchingPlantForUserPlant(userPlant);
      setCurrentPlant(plant);
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
