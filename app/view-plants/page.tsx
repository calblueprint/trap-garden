'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import {
  getAllPlants,
  getMatchingPlantForUserPlant,
} from '@/api/supabase/queries/plants';
import { getCurrentUserPlantsByUserId } from '@/api/supabase/queries/userPlants';
import FilterDropdownMultiple from '@/components/FilterDropdownMultiple';
import PlantCard from '@/components/PlantCard';
import SearchBar from '@/components/SearchBar';
import COLORS from '@/styles/colors';
import { DropdownOption, OwnedPlant, Plant } from '@/types/schema';
import {
  checkDifficulty,
  checkGrowingSeason,
  checkSearchTerm,
  checkSunlight,
} from '@/utils/helpers';
import {
  AddButton,
  FilterContainer,
  HeaderButton,
  NumberSelectedPlants,
  NumberSelectedPlantsContainer,
  PlantGridContainer,
  PlantGridView,
  PlantSelection,
  PlantSelectionHeaderAllPlants,
  PlantSelectionHeaderMyPlants,
  SelectButton,
  TopRowContainer,
} from './styles';

export default function Page() {
  const router = useRouter();
  const [viewingOption, setViewingOption] = useState<'myPlants' | 'all'>(
    'myPlants',
  );
  const [inAddMode, setInAddMode] = useState<boolean>(false);
  const [plants, setPlants] = useState<Plant[]>([]);
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

  // Fetch All Plants
  useEffect(() => {
    (async () => {
      const plantList = await getAllPlants();
      const result = plantList.filter(plant => plant.us_state === userState);
      setPlants(result);
    })();
  }, []);

  // Fetch User Plants for My Garden tab
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
    return ownedPlants.filter(
      ownedPlant =>
        checkGrowingSeason(selectedGrowingSeason, ownedPlant.plant) &&
        checkSunlight(selectedSunlight, ownedPlant.plant) &&
        checkDifficulty(selectedDifficulty, ownedPlant.plant) &&
        checkSearchTerm(searchTerm, ownedPlant.plant),
    );
  }, [
    ownedPlants,
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
  function finishSelectPlants() {
    //TODO: route to add details with proper information
  }
  function handlePlantPlurality() {
    return selectedPlants.length > 1 ? 'Plants' : 'Plant';
  }

  return (
    <div className="main">
      <div id="plantContent">
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
              <PlantSelectionHeaderMyPlants>
                <HeaderButton
                  $isCurrentMode={viewingOption == 'myPlants'}
                  onClick={() => setViewingOption('myPlants')}
                >
                  My Plants
                </HeaderButton>
                <HeaderButton
                  $isCurrentMode={false}
                  onClick={() => setViewingOption('all')}
                >
                  All
                </HeaderButton>
              </PlantSelectionHeaderMyPlants>

              {filteredUserPlantList.length ? (
                <div>
                  <PlantGridContainer>
                    <PlantGridView>
                      {filteredUserPlantList.map(ownedPlant => (
                        <PlantCard
                          key={ownedPlant.userPlantId}
                          plant={ownedPlant.plant}
                          canSelect={false}
                          onClick={() => handleUserPlantCardClick(ownedPlant)}
                        />
                      ))}
                    </PlantGridView>
                  </PlantGridContainer>
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
                <NumberSelectedPlantsContainer>
                  {selectedPlants.length ? (
                    <NumberSelectedPlants>
                      {selectedPlants.length} {handlePlantPlurality()} Selected
                    </NumberSelectedPlants>
                  ) : (
                    <NumberSelectedPlants>Select Plants</NumberSelectedPlants>
                  )}
                </NumberSelectedPlantsContainer>
                <PlantSelectionHeaderAllPlants>
                  <PlantSelection>
                    <HeaderButton
                      $isCurrentMode={false}
                      onClick={() => setViewingOption('myPlants')}
                    >
                      My Plants
                    </HeaderButton>
                    <HeaderButton
                      $isCurrentMode={true}
                      onClick={() => setViewingOption('all')}
                    >
                      All
                    </HeaderButton>
                  </PlantSelection>
                  <SelectButton
                    $secondaryColor="#D94E4E"
                    onClick={() => setInAddMode(false)}
                  >
                    Cancel
                  </SelectButton>
                </PlantSelectionHeaderAllPlants>
                <PlantGridContainer>
                  <PlantGridView>
                    {filteredPlantList.map((plant, key) => (
                      <PlantCard
                        key={key}
                        plant={plant}
                        canSelect={true}
                        isSelected={selectedPlants.includes(plant)}
                        onClick={() => handlePlantCardClick(plant)}
                      />
                    ))}
                  </PlantGridView>
                </PlantGridContainer>

                <div>
                  {selectedPlants.length ? (
                    <AddButton
                      $backgroundColor={COLORS.shrub}
                      onClick={finishSelectPlants}
                    >
                      Add to My Garden
                    </AddButton>
                  ) : (
                    <AddButton $backgroundColor={COLORS.midgray}>
                      Select Plants
                    </AddButton>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <PlantSelectionHeaderAllPlants>
                  <PlantSelection>
                    <HeaderButton
                      $isCurrentMode={false}
                      onClick={() => setViewingOption('myPlants')}
                    >
                      My Plants
                    </HeaderButton>
                    <HeaderButton
                      $isCurrentMode={true}
                      onClick={() => setViewingOption('all')}
                    >
                      All
                    </HeaderButton>
                  </PlantSelection>
                  <SelectButton
                    $primaryColor={COLORS.shrub}
                    $secondaryColor="white"
                    onClick={() => setInAddMode(true)}
                  >
                    Select
                  </SelectButton>
                </PlantSelectionHeaderAllPlants>
                <PlantGridContainer>
                  <PlantGridView>
                    {filteredPlantList.map((plant, key) => (
                      <PlantCard
                        key={key}
                        plant={plant}
                        canSelect={false}
                        onClick={() => handlePlantCardClick(plant)}
                      />
                    ))}
                  </PlantGridView>
                </PlantGridContainer>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
