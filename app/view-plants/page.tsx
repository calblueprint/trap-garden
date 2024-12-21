'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAllPlants,
  getMatchingPlantForUserPlant,
} from '@/api/supabase/queries/plants';
import { getCurrentUserPlantsByUserId } from '@/api/supabase/queries/userPlants';
import FilterDropdownMultiple from '@/components/FilterDropdownMultiple';
import Icon from '@/components/Icon';
import PlantCard from '@/components/PlantCard';
import SearchBar from '@/components/SearchBar';
import COLORS from '@/styles/colors';
import { Box, Flex } from '@/styles/containers';
import { H1, P1 } from '@/styles/text';
import {
  DropdownOption,
  OwnedPlant,
  Plant,
  SeasonEnum,
  SunlightEnum,
} from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import {
  checkDifficulty,
  checkGrowingSeason,
  checkSearchTerm,
  checkSunlight,
} from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
import {
  AddButton,
  FilterContainer,
  HeaderButton,
  NumberSelectedPlants,
  NumberSelectedPlantsContainer,
  PlantGridContainer,
  SelectButton,
  SomethingWrongButton,
  TopRowContainer,
  ViewSelection,
} from './styles';

// Declaring (static) filter options outside so they're not re-rendered
// TODO: Maybe export shared filter options from a centralized file
const sunlightOptions: DropdownOption<SunlightEnum>[] = [
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
const growingSeasonOptions: DropdownOption<SeasonEnum>[] = [
  { label: 'Spring', value: 'SPRING' },
  { label: 'Summer', value: 'SUMMER' },
  { label: 'Fall', value: 'FALL' },
  { label: 'Winter', value: 'WINTER' },
];

export default function Page() {
  const router = useRouter();
  const { hasPlot, profileData, profileReady, setPlantsToAdd } = useProfile();
  const { userId, loading: authLoading } = useAuth();

  const [viewingOption, setViewingOption] = useState<'myPlants' | 'all'>(
    hasPlot ? 'myPlants' : 'all',
  );
  const [inAddMode, setInAddMode] = useState<boolean>(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    DropdownOption[]
  >([]);
  const [selectedSunlight, setSelectedSunlight] = useState<
    DropdownOption<SunlightEnum>[]
  >([]);
  const [selectedGrowingSeason, setSelectedGrowingSeason] = useState<
    DropdownOption<SeasonEnum>[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPlants, setSelectedPlants] = useState<Plant[]>([]);
  const [ownedPlants, setOwnedPlants] = useState<OwnedPlant[]>([]);
  const userState = profileData?.us_state ?? null;

  const profileAndAuthReady = profileReady && !authLoading;

  // Fetch All Plants
  useEffect(() => {
    // Only fetch plants when profile is ready and we have a state
    if (profileReady && userState) {
      (async () => {
        const plantList = await getAllPlants();
        const result = plantList
          .filter(plant => plant.us_state === userState)
          .sort((a, b) => a.plant_name.localeCompare(b.plant_name));
        setPlants(result);
      })();
    }
  }, [profileReady, userState]);

  // Fetch User Plants for My Garden tab
  useEffect(() => {
    // Only fetch user plants if we have a valid userId
    if (!authLoading && userId) {
      const fetchUserPlants = async () => {
        const fetchedUserPlants = await getCurrentUserPlantsByUserId(userId);

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
    }
  }, [userId, authLoading]);

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
    router.push(`/plant-page/my-garden/${ownedPlant.userPlantId}`);
  }

  function handlePlantCardClick(plant: Plant) {
    if (inAddMode) {
      if (selectedPlants.includes(plant)) {
        setSelectedPlants(selectedPlants.filter(item => item !== plant));
      } else {
        setSelectedPlants([...selectedPlants, plant]);
      }
    } else {
      router.push(`/plant-page/all-plants/${plant.id}`);
    }
  }
  function handleAddPlants() {
    setPlantsToAdd(selectedPlants);

    router.push('/add-details');
  }

  function handleCancelAddMode() {
    setSelectedPlants([]);
    setInAddMode(false);
  }

  function MainBody() {
    // assume auth and profile are both ready
    // Not logged in
    if (!userId) {
      return (
        <Flex
          $direction="column"
          $textAlign="center"
          $justify="center"
          $w="240px"
          $align="center"
          $m="auto"
          $p="20px"
          $gap="8px"
          $h="60vh"
        >
          <Icon type="sprout"></Icon>
          <P1 $color={COLORS.midgray}>Log In to view all plants</P1>
          <SomethingWrongButton
            $width="170px"
            onClick={() => router.push('/login')}
          >
            Log In
          </SomethingWrongButton>
        </Flex>
      );
    }

    // Not onboarded
    if (!profileData) {
      return (
        <Flex
          $direction="column"
          $textAlign="center"
          $justify="center"
          $w="320px"
          $align="center"
          $m="auto"
          $p="20px"
          $gap="8px"
          $h="60vh"
        >
          <Icon type="sprout"></Icon>
          <P1 $color={COLORS.midgray}>Complete your profile view all plants</P1>
          <SomethingWrongButton
            $width="170px"
            onClick={() => router.push('/onboarding')}
          >
            Go To Onboarding
          </SomethingWrongButton>
        </Flex>
      );
    }

    // Onboarded and Logged in: Normal Screen
    return (
      <>
        <Flex $justify="between" $pb="12px">
          <ViewSelection>
            <HeaderButton
              $isCurrentMode={viewingOption !== 'all'}
              onClick={() => setViewingOption('myPlants')}
            >
              My Garden
            </HeaderButton>
            <HeaderButton
              $isCurrentMode={viewingOption === 'all'}
              onClick={() => setViewingOption('all')}
            >
              All
            </HeaderButton>
          </ViewSelection>
          {/* Select/Cancel toggles Add Mode; appears in All plants only*/}
          {viewingOption === 'all' &&
            (inAddMode ? (
              <SelectButton
                $secondaryColor={COLORS.errorRed}
                onClick={handleCancelAddMode}
              >
                Cancel
              </SelectButton>
            ) : (
              <SelectButton
                $primaryColor={COLORS.shrub}
                $secondaryColor="white"
                onClick={() => setInAddMode(true)}
              >
                Select
              </SelectButton>
            ))}
        </Flex>

        {viewingOption === 'myPlants' ? (
          <MyPlantsDisplay />
        ) : (
          <AllPlantsDisplay />
        )}
      </>
    );
  }

  function MyPlantsDisplay() {
    return (
      <div>
        {ownedPlants.length === 0 ? (
          <Flex
            $direction="column"
            $textAlign="center"
            $justify="center"
            $w="220px"
            $align="center"
            $m="auto"
            $p="20px"
            $gap="8px"
            $h="60vh"
          >
            <Icon type="sprout"></Icon>
            <P1 $color={COLORS.midgray}>Your plant list is empty</P1>
            <SomethingWrongButton
              $width="125px"
              onClick={() => setViewingOption('all')}
            >
              Add Plants
            </SomethingWrongButton>
          </Flex>
        ) : filteredUserPlantList.length === 0 ? (
          <Flex
            $direction="column"
            $textAlign="center"
            $justify="center"
            $w="220px"
            $align="center"
            $m="auto"
            $p="20px"
            $gap="8px"
            $h="60vh"
          >
            <Icon type="sprout"></Icon>
            <P1 $color={COLORS.midgray}>No matching plants</P1>
            <SomethingWrongButton $width="125px" onClick={() => clearFilters()}>
              Clear Filters
            </SomethingWrongButton>
          </Flex>
        ) : (
          <PlantGridContainer>
            {filteredUserPlantList.map(ownedPlant => (
              <PlantCard
                key={ownedPlant.userPlantId}
                plant={ownedPlant.plant}
                canSelect={false}
                onClick={() => handleUserPlantCardClick(ownedPlant)}
                // aspectRatio="168 / 200"
              />
            ))}
          </PlantGridContainer>
        )}
      </div>
    );
  }

  function AllPlantsDisplay() {
    return (
      <>
        {filteredPlantList.length === 0 ? (
          <Flex
            $direction="column"
            $textAlign="center"
            $justify="center"
            $w="220px"
            $align="center"
            $m="auto"
            $p="20px"
            $gap="8px"
            $h="60vh"
          >
            <Icon type="sprout"></Icon>
            <P1 $color={COLORS.midgray}>No matching plants</P1>
            <SomethingWrongButton $width="125px" onClick={() => clearFilters()}>
              Clear Filters
            </SomethingWrongButton>
          </Flex>
        ) : (
          <PlantGridContainer>
            {filteredPlantList.map(plant => (
              <PlantCard
                key={plant.id}
                plant={plant}
                canSelect={inAddMode}
                isSelected={selectedPlants.includes(plant)}
                onClick={() => handlePlantCardClick(plant)}
                // aspectRatio="168 / 200"
              />
            ))}
          </PlantGridContainer>
        )}
        {inAddMode && (
          <AddButton
            $backgroundColor={
              selectedPlants.length ? COLORS.shrub : COLORS.midgray
            }
            onClick={handleAddPlants}
            disabled={!selectedPlants.length}
          >
            {selectedPlants.length ? 'Add to My Garden' : 'Select Plants'}
          </AddButton>
        )}
      </>
    );
  }

  const plantPluralityString = selectedPlants.length > 1 ? 'Plants' : 'Plant';

  return (
    <div id="plantContent">
      <TopRowContainer>
        <H1 $color={COLORS.shrub} $fontWeight={500}>
          View Plants
        </H1>
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
      <Box $h="24px">
        {viewingOption === 'all' && inAddMode ? (
          <NumberSelectedPlantsContainer>
            <NumberSelectedPlants>
              {selectedPlants.length
                ? `${selectedPlants.length} ${plantPluralityString} Selected`
                : 'Select Plants'}
            </NumberSelectedPlants>
          </NumberSelectedPlantsContainer>
        ) : null}
      </Box>
      <Box $px="24px">
        {/* Plant Cards and Body */}
        {!profileAndAuthReady ? <>Loading</> : <MainBody />}
      </Box>
    </div>
  );
}
