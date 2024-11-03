'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import supabase from '@/api/supabase/createClient';
import { getAllPlants, getPlantById } from '@/api/supabase/queries/plants';
import PlantCard from '@/components/PlantCard';
import { Plant } from '@/types/schema';

export default function Page() {
  const [viewingOption, setViewingOption] = useState<'myPlants' | 'all'>(
    'myPlants',
  );
  const [inAddMode, setInAddMode] = useState<boolean>(false);

  const [plants, setPlants] = useState<Plant[]>([]);
  const [userPlants, setUserPlants] = useState<Plant[]>([]);
  const [selectedPlants, setSelectedPlants] = useState<Plant[]>([]);
  const user_id: UUID = 'e72af66d-7aae-45f6-935a-187197749d9f';
  const userState = 'TENNESSEE';
  async function fetchUserPlants(user_id: UUID) {
    const { data, error } = await supabase
      .from('user_plants')
      .select('plant_id')
      .eq('user_id', user_id)
      .is('date_harvested', null);

    if (error) {
      console.error('Error fetching plant IDs:', error);
      return [];
    }
    if (!data) return [];
    const plantIds = data.map(row => row.plant_id) || [];

    const plantsUser: Plant[] = await Promise.all(
      plantIds.map(plantId => getPlantById(plantId)),
    );
    return plantsUser;
  }
  useEffect(() => {
    const fetchPlantSeasonality = async () => {
      const plantList = await getAllPlants();
      const result = plantList.filter(plant => plant.us_state === userState);
      setPlants(result);
    };

    fetchPlantSeasonality();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchUserPlants(user_id);
      setUserPlants(result);
    };
    fetchData();
  }, []);
  function excludeElement<T>(array: T[], element: T): T[] {
    return array.filter(item => item !== element);
  }

  function addPlant(plant: Plant) {
    if (selectedPlants.includes(plant)) {
      setSelectedPlants(excludeElement(selectedPlants, plant));
    } else {
      setSelectedPlants([...selectedPlants, plant]);
    }
    console.log(selectedPlants);
  }

  return (
    <div className="main">
      <div id="plantContent">
        <div className="plantSelectionHeader">
          <button onClick={() => setViewingOption('myPlants')}>
            My Plants
          </button>
          <button onClick={() => setViewingOption('all')}>All</button>
        </div>
        <div className="componentsDisplay">
          {viewingOption === 'myPlants' &&
            (userPlants.length ? (
              <div>
                {userPlants.map((plant, key) => (
                  <PlantCard key={key} plant={plant} canSelect={false} />
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => setViewingOption('all')}>
                  Add Plants
                </button>
              </div>
            ))}
          {viewingOption === 'all' &&
            (inAddMode ? (
              <div>
                <h3>Select Plants</h3>
                {plants.map((plant, key) => (
                  <div key={key} onClick={() => addPlant(plant)}>
                    <PlantCard key={key} plant={plant} canSelect={true} />
                  </div>
                ))}
                <div className="footer">
                  <button onClick={() => setInAddMode(false)}>
                    Select Plants
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {plants.map((plant, key) => (
                  <PlantCard key={key} plant={plant} canSelect={false} />
                ))}
                <div className="footer">
                  <button onClick={() => setInAddMode(true)}>
                    Add to my plants
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
