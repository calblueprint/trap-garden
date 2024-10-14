'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { getPlantById } from '@/api/supabase/queries/plants';
import PlantCard from '@/components/PlantCard/PlantCard';
import { Plant } from '@/types/schema';
import supabase from '@/api/supabase/createClient';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<'myPlants' | 'all'>(
    'myPlants',
  );
  const [isSelected, setIsSelected] = useState<true | false>(false);

  const [plants, setPlants] = useState<Plant[]>([]);
  const [userPlants, setUserPlants] = useState<Plant[]>([]);
  const user_id: UUID = 'e72af66d-7aae-45f6-935a-187197749d9f';
  async function fetchUserPlants(user_id: UUID) {
    const { data, error } = await supabase
      .from('user_plants')
      .select('plant_id')
      .eq('user_id', user_id);

    if (error) {
      console.error('Error fetching plant IDs:', error);
      return [];
    }

    const plantIds = data?.map(row => row.plant_id) || [];
    if (plantIds.length === 0) {
      return [];
    }

    const plantsUser: Plant[] = await Promise.all(
      plantIds.map(plantId => get_plant_by_id('Tennessee', plantId)),
    );
    return plantsUser;
  }
  useEffect(() => {
    const fetchPlantSeasonality = async () => {
      const plantList = await getPlantSeasonality('Tennessee');
      setPlants(plantList);
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

  // Handle button clicks
  const handleClick = (option: 'myPlants' | 'all') => {
    setSelectedOption(option);
  };
  const handleSelected = (isSelectedInput: true | false) => {
    setIsSelected(isSelectedInput);
  };
  return (
    <div className="main">
      <div id="plantContent">
        <div className="plantSelectionHeader">
          <button onClick={() => handleClick('myPlants')}>My Plants</button>
          <button onClick={() => handleClick('all')}>All</button>
        </div>
        <div className="componentsDisplay">
          {selectedOption === 'myPlants' && userPlants.length == 0 && (
            <div>
              <button onClick={() => handleClick('all')}>Add Plants</button>
            </div>
          )}
          {selectedOption === 'myPlants' && (
            <div>
              {userPlants.map((plant, key) => (
                <PlantCard key={key} plantObj={plant} canSelect={false} />
              ))}
            </div>
          )}
          {selectedOption === 'all' && isSelected == true && (
            <div>
              {plants.map((plant, key) => (
                <PlantCard key={key} plantObj={plant} canSelect={true} />
              ))}
              <div className="footer">
                <button>Add to my plants</button>
              </div>
            </div>
          )}
          {selectedOption === 'all' && isSelected == false && (
            <div>
              {plants.map((plant, key) => (
                <PlantCard key={key} plantObj={plant} canSelect={false} />
              ))}
              <div className="footer">
                <button onClick={() => handleSelected(true)}>
                  Add to my plants
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
