'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { updateUserPlants } from '@/api/supabase/queries/updateUserPlants';
import PlantDetails from '@/components/PlantDetails';
import { Plant, UserPlants } from '@/types/schema';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [details, setDetails] = useState<Partial<UserPlants>[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const router = useRouter();

  const plants: Plant[] = [
    {
      id: '43c19f80-8205-4d03-b323-05c220550bf0',
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
      id: '43c19f80-8205-4d03-b323-05c220550bf0',
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
  const user_id: UUID = 'e72af66d-7aae-45f6-935a-187197749d9f';
  const getDefaultDate = () => new Date().toISOString().substring(0, 10);

  function move(steps: number) {
    // Navigate between plants and save input data
    const currentDetail = details[currentIndex - 1];
    if (
      (!currentDetail || !currentDetail.date_added) &&
      currentIndex <= plants.length
    ) {
      updateInput('date_added', getDefaultDate());
    }
    if (
      steps > 0 &&
      (!currentDetail?.planting_type ||
        currentDetail?.planting_type == 'SELECT')
    ) {
      alert('Please select a valid planting type and date before proceeding.');
      return;
    }
    if (
      steps !== 0 &&
      currentIndex + steps > 0 &&
      currentIndex + steps <= plants.length + 1
    ) {
      if (steps > 0) {
        setIsDisabled(true);
      }
      setCurrentIndex(prevIndex => prevIndex + steps);
    }
  }

  function updateInput(field: string, value: string) {
    // Update the specific field of the current plant's details
    if (field == 'planting_type') {
      let shouldBeDisabled = isDisabled;
      if (value === 'SELECT') {
        shouldBeDisabled = true;
      } else {
        shouldBeDisabled = false;
      }
      setIsDisabled(shouldBeDisabled);
    }
    const updatedDetails = [...details];
    updatedDetails[currentIndex - 1] = {
      ...updatedDetails[currentIndex - 1],
      [field]: value,
      plant_id: plants[currentIndex - 1].id,
    };
    setDetails(updatedDetails);
  }

  function updateDB() {
    updateUserPlants(user_id, details);
    router.push('/view-plants');
  }

  return (
    <div>
      {currentIndex !== plants.length + 1 && (
        <div>
          <PlantDetails
            plant={plants[currentIndex - 1]}
            date={details[currentIndex - 1]?.date_added || getDefaultDate()}
            plantingType={details[currentIndex - 1]?.planting_type || ''}
            onDateChange={date => updateInput('date_added', date)}
            onPlantingTypeChange={type => updateInput('planting_type', type)}
          />
          <button onClick={() => move(-1)}>Back</button>
          <p>
            {currentIndex} / {plants.length}
          </p>
          <button disabled={isDisabled} onClick={() => move(1)}>
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
