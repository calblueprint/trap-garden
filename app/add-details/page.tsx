'use client';

import { useState } from 'react';
import { UUID } from 'crypto';
import { updateUserPlants } from '@/api/supabase/queries/updateUserPlants';
import PlantDetails from '@/components/PlantDetails/PlantDetails';
import { Plant } from '@/types/schema';

interface FormData {
  name: string;
  date: string;
  plant_type: string;
  plantID: UUID;
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [details, setDetails] = useState<FormData[]>([]);
  const plants: Plant[] = [
    {
      id: '43c19f80-8205-4d03-b323-05c220550bf0',
      plant_name: 'Cabbage',
      state: 'Tennessee',
      harvest_season: 'SPRING',
      water_frequency: '1',
      weed_frequency: '1',
      plant_seed_indoors_start: 'null',
      plant_seed_indoors_end: 'null',
      plant_seed_outdoors_start: 'null',
      plant_seed_outdoors_end: 'string',
      plant_transplant_start: 'string',
      plant_transplant_end: 'null',
      beginner_friendly: true,
      plant_tips: 'none',
      difficulty_level: 'HARD',
      harvest_start: 'null',
      harvest_end: 'null',
      sunlight_min_hours: 5,
      sunlight_max_hours: 6,
      img: 'null',
    },
    {
      id: '43c19f80-8205-4d03-b323-05c220550bf0',
      plant_name: 'Tomatoo',
      state: 'Tennessee',
      harvest_season: 'SPRING',
      water_frequency: '1',
      weed_frequency: '1',
      plant_seed_indoors_start: 'null',
      plant_seed_indoors_end: 'null',
      plant_seed_outdoors_start: 'null',
      plant_seed_outdoors_end: 'string',
      plant_transplant_start: 'string',
      plant_transplant_end: 'null',
      beginner_friendly: true,
      plant_tips: 'none',
      difficulty_level: 'HARD',
      harvest_start: 'null',
      harvest_end: 'null',
      sunlight_min_hours: 5,
      sunlight_max_hours: 6,
      img: 'null',
    },
  ];
  const user_id: UUID = 'e72af66d-7aae-45f6-935a-187197749d9f';

  function move(steps: number) {
    if (currentIndex != plants.length + 1) {
      const updatedDetails = [...details];
      const name = plants[currentIndex - 1]['plant_name'];
      const plantID = plants[currentIndex - 1]['id'];
      const date = (document.getElementById('date')! as HTMLInputElement).value;
      const plant_type = (
        document.getElementById('plantingType')! as HTMLInputElement
      ).value;
      updatedDetails[currentIndex - 1] = {
        name: name,
        date: date,
        plant_type: plant_type,
        plantID: plantID,
      };
      setDetails(updatedDetails);
    }
    if (steps < 0 && currentIndex != 1) {
      setCurrentIndex(currentIndex - 1);
    } else if (steps > 0 && currentIndex != plants.length + 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }
  function updateDB(user_id: UUID) {
    console.log(details);
    updateUserPlants(user_id, details);
  }

  return (
    <div>
      {currentIndex != plants.length + 1 && (
        <div>
          <PlantDetails plant={plants[currentIndex - 1]}></PlantDetails>
          <button onClick={() => move(-1)}>Back</button>
          <p>
            {currentIndex} / {plants.length}
          </p>
          <button onClick={() => move(1)}>Next</button>
        </div>
      )}
      {currentIndex == plants.length + 1 && (
        <div>
          <button onClick={() => move(-1)}>Back</button>
          <button
            onClick={() => {
              updateDB(user_id);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
