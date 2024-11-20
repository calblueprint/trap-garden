'use client';

import { useEffect, useMemo, useState } from 'react';
import { UUID } from 'crypto';
import { getAllPlants, getPlantById, getMatchingPlantForUserPlants, } from '@/api/supabase/queries/plants';
import FilterDropdownMultiple from '@/components/FilterDropdownMultiple';
import { useRouter } from 'next/navigation';
import { getCurrentUserPlantsByUserId } from '@/api/supabase/queries/userPlants';
import PlantCard from '@/components/PlantCard';
import SearchBar from '@/components/SearchBar';
import { DropdownOption, OwnedPlant, Plant } from '@/types/schema';
import {
  checkDifficulty,
  checkGrowingSeason,
  checkSearchTerm,
  checkSunlight,
} from '@/utils/helpers';
import { FilterContainer, TopRowContainer } from './styles';
export default function Page() {
  const router = useRouter();
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
  const [selectedPlants, setSelectedPlants] = useState<Plant[]>([]);
  const [ownedPlants, setOwnedPlants] = useState<OwnedPlant[]>([]);

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

  useEffect(() => {
    (async () => {
      const plantList = await getAllPlants();
      const result = plantList.filter(plant => plant.us_state === userState);
      setPlants(result);
    })();
  }, []);

  useEffect(() => {
    const fetchUserPlants = async () => {
      const fetchedUserPlants = await getCurrentUserPlantsByUserId(user_id);

      const ownedPlants: OwnedPlant[] = await Promise.all(
        fetchedUserPlants.map(async userPlant => {
          const plant = await getMatchingPlantForUserPlant(userPlant);
          return {
            userPlantId: userPlant.id,
            plant,
          };
        }),
      );
      setOwnedPlants(ownedPlants);
    };
    fetchUserPlants();
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
  function handleUserPlantCardClick(ownedPlant: OwnedPlant) {
    router.push(`my-garden/${ownedPlant.userPlantId}`);
  }

  function handlePlantCardClick(plant: Plant) {
    if (inAddMode) {
      if (selectedPlants.includes(plant)) {
        setSelectedPlants(selectedPlants.filter(item => item !== plant));
      } else {
        setSelectedPlants([...selectedPlants, plant]);
      }
    } else {
      router.push(`all-plants/${plant.id}`);
    }
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
                <div>
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
                <div>
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
