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
  const router = useRouter();

  const plants: Plant[] = [
    {
      id: '43c19f80-8205-4d03-b323-05c220550bf0',
      plant_name: 'cabbbage',
      us_state: 'string',
      harvest_season: 'SPRING',
      water_frequency: 'string',
      weeding_frequency: 'string',
      plant_seed_indoors_start: 'string',
      plant_seed_indoors_end: 'string',
      plant_seed_outdoors_start: 'string',
      plant_seed_outdoors_end: 'string',
      plant_transplant_start: 'string',
      plant_transplant_end: 'string',
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
      plant_name: 'tomatoooooo',
      us_state: 'string',
      harvest_season: 'SPRING',
      water_frequency: 'string',
      weeding_frequency: 'string',
      plant_seed_indoors_start: 'string',
      plant_seed_indoors_end: 'string',
      plant_seed_outdoors_start: 'string',
      plant_seed_outdoors_end: 'string',
      plant_transplant_start: 'string',
      plant_transplant_end: 'string',
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

  function move(steps: number) {
    // if ur not at the end of the plant details flow update details to store what was in the inputs
    if (currentIndex != plants.length + 1) {
      const updatedDetails = [...details];
      const plantID = plants[currentIndex - 1]['id'];
      const date = (document.getElementById('date')! as HTMLInputElement).value;
      const plant_type = (
        document.getElementById('plantingType')! as HTMLInputElement
      ).value;
      updatedDetails[currentIndex - 1] = {
        date_added: date,
        planting_type: plant_type,
        plant_id: plantID,
      };
      setDetails(updatedDetails);
    }
    //if param steps is less than 0 and ur not at start, move back
    if (steps < 0 && currentIndex != 1) {
      setCurrentIndex(currentIndex => currentIndex - 1);

      //retrieve input for that element
      //updateInput()
      //if param steps is more than 0 and ur not at the end, move forward
    } else if (steps > 0 && currentIndex != plants.length + 1) {
      setCurrentIndex(currentIndex => currentIndex + 1);

      //retrieve input for that element
      //updateInput()
    }
  }
  function updateDB(user_id: UUID) {
    //console.log(details)
    updateUserPlants(user_id, details);
    router.push('/view-plants');
  }
  function getDetails() {
    if (details[currentIndex - 1]) {
      return details[currentIndex - 1];
    }
    return undefined;
  }

  return (
    <div>
      {currentIndex != plants.length + 1 && (
        <div>
          <PlantDetails
            detail={getDetails()!}
            plant={plants[currentIndex - 1]}
          ></PlantDetails>
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
