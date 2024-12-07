'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertUserPlants } from '@/api/supabase/queries/userPlants';
import PlantDetails from '@/components/PlantDetails';
import { UserPlant } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';

export default function Home() {
  const { profileData, profileReady, plantsToAdd } = useProfile();
  const { userId } = useAuth();
  const router = useRouter();

  if (profileReady && !profileData) {
    router.push('/view-plants');
  }
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [details, setDetails] = useState<Partial<UserPlant>[]>(
    plantsToAdd.map(plant => ({ plant_id: plant.id, user_id: userId! })),
  );

  const getDefaultDate = () => new Date().toISOString().substring(0, 10);

  // Navigate between plants and save input data
  function move(steps: number) {
    const currentDetail = details[currentIndex - 1];

    // Set curr date in details to default date if not on submission page
    if (
      (!currentDetail || !currentDetail.date_added) &&
      currentIndex <= plantsToAdd.length
    ) {
      updateInput('date_added', getDefaultDate());
    }
    // For valid moves, move to next page
    if (
      steps !== 0 &&
      currentIndex + steps > 0 &&
      currentIndex + steps <= plantsToAdd.length + 1
    ) {
      setCurrentIndex(prevIndex => prevIndex + steps);
    }
  }

  function disableNext() {
    // disable next if planting type is "SELECT" or undefined
    return !(
      details[currentIndex - 1].planting_type
      // requires refactor of details to ensure that planting_type is PlantingTypeEnum
      // && details[currentIndex - 1].planting_type !== 'SELECT'
    );
  }

  function updateInput(field: string, value: string) {
    const updatedDetails = [...details];
    updatedDetails[currentIndex - 1] = {
      ...updatedDetails[currentIndex - 1],
      [field]: value,
    };
    setDetails(updatedDetails);
  }

  async function updateDB() {
    await insertUserPlants(userId!, details);
    router.push('/view-plants');
  }

  return (
    <div>
      {currentIndex !== plantsToAdd.length + 1 && (
        <div>
          <PlantDetails
            plant={plantsToAdd[currentIndex - 1]}
            date={details[currentIndex - 1].date_added || getDefaultDate()}
            plantingType={details[currentIndex - 1].planting_type || 'SELECT'}
            onDateChange={date => updateInput('date_added', date)}
            onPlantingTypeChange={type => updateInput('planting_type', type)}
          />
          <button onClick={() => move(-1)}>Back</button>
          <p>
            {currentIndex} / {plantsToAdd.length}
          </p>
          <button disabled={disableNext()} onClick={() => move(1)}>
            Next
          </button>
        </div>
      )}
      {currentIndex === plantsToAdd.length + 1 && (
        <div>
          <button onClick={() => move(-1)}>Back</button>
          <button onClick={updateDB}>Submit</button>
        </div>
      )}
    </div>
  );
}
