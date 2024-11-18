'use client';

import { useEffect, useMemo, useState } from 'react';
import { UUID } from 'crypto';
import supabase from '@/api/supabase/createClient';
import { getAllPlants, getPlantById } from '@/api/supabase/queries/plants';
import FilterDropdownMultiple from '@/components/FilterDropdownMultiple';
import PlantCard from '@/components/PlantCard';
import SearchBar from '@/components/SearchBar';
import { DropdownOption, Plant } from '@/types/schema';
import {
  checkDifficulty,
  checkGrowingSeason,
  checkSearchTerm,
  checkSunlight,
} from '@/utils/helpers';
import { FilterContainer, TopRowContainer } from './styles';

export default function Page() {
  const [viewingOption, setViewingOption] = useState<'myPlants' | 'all'>(
    'myPlants',
  );
  const [inAddMode, setInAddMode] = useState<boolean>(false);

  const [plants, setPlants] = useState<Plant[]>([]);
  const [userPlants, setUserPlants] = useState<Plant[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    DropdownOption[]
  >([]);
  const [selectedSunlight, setSelectedSunlight] = useState<DropdownOption[]>(
    [],
  );
  const [selectedGrowingSeason, setSelectedGrowingSeason] = useState<
    DropdownOption[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const user_id: UUID = '0802d796-ace8-480d-851b-d16293c74a21';
  const userState = 'TENNESSEE';
  const sunlightOptions: DropdownOption[] = [
    { label: 'Less than 2 hours', value: 'SHADE' },
    { label: '2-4 hours', value: 'PARTIAL_SHADE' },
    { label: '4-6 hours', value: 'PARTIAL_SUN' },
    { label: '6+ hours', value: 'FULL' },
  ];
  const difficultyOptions: DropdownOption[] = [
    { label: 'Easy', value: 'EASY' },
    { label: 'Moderate', value: 'MODERATE' },
    { label: 'Hard', value: 'HARD' },
  ];
  const growingSeasonOptions: DropdownOption[] = [
    { label: 'Spring', value: 'SPRING' },
    { label: 'Summer', value: 'SUMMER' },
    { label: 'Fall', value: 'FALL' },
    { label: 'Winter', value: 'WINTER' },
  ];

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

  const clearFilters = () => {
    setSelectedGrowingSeason([]);
    setSelectedSunlight([]);
    setSelectedDifficulty([]);
  };

  const filteredPlantList = useMemo(() => {
    return plants.filter(
      plant =>
        checkGrowingSeason(selectedGrowingSeason, plant) &&
        checkSunlight(selectedSunlight, plant) &&
        checkDifficulty(selectedDifficulty, plant) &&
        checkSearchTerm(searchTerm, plant),
    );
  }, [
    plants,
    selectedDifficulty,
    selectedSunlight,
    selectedGrowingSeason,
    searchTerm,
  ]);

  const filteredUserPlantList = useMemo(() => {
    return userPlants.filter(
      plant =>
        checkGrowingSeason(selectedGrowingSeason, plant) &&
        checkSunlight(selectedSunlight, plant) &&
        checkDifficulty(selectedDifficulty, plant) &&
        checkSearchTerm(searchTerm, plant),
    );
  }, [
    userPlants,
    selectedDifficulty,
    selectedSunlight,
    selectedGrowingSeason,
    searchTerm,
  ]);

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
          <TopRowContainer>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FilterContainer>
              <FilterDropdownMultiple
                value={selectedDifficulty}
                setStateAction={setSelectedDifficulty}
                options={difficultyOptions}
                placeholder="Difficulty Level"
              />
              <FilterDropdownMultiple
                value={selectedSunlight}
                setStateAction={setSelectedSunlight}
                options={sunlightOptions}
                placeholder="Sunlight"
              />
              <FilterDropdownMultiple
                value={selectedGrowingSeason}
                setStateAction={setSelectedGrowingSeason}
                options={growingSeasonOptions}
                placeholder="Growing Season"
              />

              <button onClick={clearFilters}>Clear filters</button>
            </FilterContainer>
          </TopRowContainer>
          {viewingOption === 'myPlants' && (
            <div>
              {filteredUserPlantList.length ? (
                <div>
                  {filteredUserPlantList.map((plant, key) => (
                    <PlantCard key={key} plant={plant} canSelect={false} />
                  ))}
                </div>
              ) : (
                <div>
                  <button onClick={() => setViewingOption('all')}>
                    Add Plants
                  </button>
                </div>
              )}
            </div>
          )}
          {viewingOption === 'all' &&
            (inAddMode ? (
              <div>
                {filteredPlantList.map((plant, key) => (
                  <PlantCard key={key} plant={plant} canSelect={true} />
                ))}
                <div className="footer">
                  <button onClick={() => setInAddMode(false)}>
                    Select Plants
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {filteredPlantList.map((plant, key) => (
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
