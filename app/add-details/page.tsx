'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { updateUserPlants } from '@/api/supabase/queries/updateUserPlants';
import PlantDetails from '@/components/PlantDetails';
import { Plant, UserPlants } from '@/types/schema';

const plants: Plant[] = [
  {
    id: 'cfed129c-1cdf-4089-89d2-83ae2fb2f83d',
    plant_name: 'cabbage',
    us_state: 'string',
    harvest_season: 'SPRING',
    water_frequency: 'string',
    weeding_frequency: 'string',
    indoors_start: 'string',
    indoors_end: 'string',
    outdoors_start: 'string',
    outdoors_end: 'string',
    transplant_start: 'string',
    transplant_end: 'string',
    harvest_start: 'string',
    harvest_end: 'string',
    beginner_friendly: true,
    plant_tips: 'string',
    img: 'string',
    difficulty_level: 'HARD',
    sunlight_min_hours: 1,
    sunlight_max_hours: 1,
  },
  {
    id: '8f25fca8-6e86-486b-9a2b-79f68efa3658',
    plant_name: 'tomato',
    us_state: 'string',
    harvest_season: 'SPRING',
    water_frequency: 'string',
    weeding_frequency: 'string',
    indoors_start: 'string',
    indoors_end: 'string',
    outdoors_start: 'string',
    outdoors_end: 'string',
    transplant_start: 'string',
    transplant_end: 'string',
    harvest_start: 'string',
    harvest_end: 'string',
    beginner_friendly: true,
    plant_tips: 'string',
    img: 'string',
    difficulty_level: 'HARD',
    sunlight_min_hours: 1,
    sunlight_max_hours: 1,
  },
];
const user_id: UUID = '0802d796-ace8-480d-851b-d16293c74a21';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [details, setDetails] = useState<Partial<UserPlants>[]>(
    plants.map(plant => ({ plant_id: plant.id, user_id: user_id })),
  );
  const router = useRouter();

  const getDefaultDate = () => new Date().toISOString().substring(0, 10);

  // Navigate between plants and save input data
  function move(steps: number) {
    const currentDetail = details[currentIndex - 1];

    // Set curr date in details to default date if not on submission page
    if (
      (!currentDetail || !currentDetail.date_added) &&
      currentIndex <= plants.length
    ) {
      updateInput('date_added', getDefaultDate());
    }
    // For valid moves, move to next page
    if (
      steps !== 0 &&
      currentIndex + steps > 0 &&
      currentIndex + steps <= plants.length + 1
    ) {
      setCurrentIndex(prevIndex => prevIndex + steps);
    }
  }

  function disableNext() {
    // disable next if planting type is "SELECT" or undefined
    return !(
      details[currentIndex - 1].planting_type &&
      details[currentIndex - 1].planting_type !== 'SELECT'
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
    await updateUserPlants(user_id, details);
    router.push('/view-plants');
  }

  return (
    <div>
      {currentIndex !== plants.length + 1 && (
        <div>
          <PlantDetails
            plant={plants[currentIndex - 1]}
            date={details[currentIndex - 1].date_added || getDefaultDate()}
            plantingType={details[currentIndex - 1].planting_type || 'SELECT'}
            onDateChange={date => updateInput('date_added', date)}
            onPlantingTypeChange={type => updateInput('planting_type', type)}
          />
          <button onClick={() => move(-1)}>Back</button>
          <p>
            {currentIndex} / {plants.length}
          </p>
          <button disabled={disableNext()} onClick={() => move(1)}>
            Next
          </button>
        </div>
      )}
      {currentIndex === plants.length + 1 && (
        <div>
          <button onClick={() => move(-1)}>Back</button>
          <button onClick={updateDB}>Submit</button>
        </div>
      )}
    </div>
  );
}
