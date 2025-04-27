'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  getAllPlants,
  getMatchingPlantForUserPlant,
} from '@/api/supabase/queries/plants';
import { getCurrentUserPlantsByUserId } from '@/api/supabase/queries/userPlants';
import { Button, SmallButton } from '@/components/Buttons';
import FilterDropdownMultiple from '@/components/FilterDropdownMultiple';
import Icon from '@/components/Icon';
import PlantCard from '@/components/PlantCard';
import PlantCardKey from '@/components/PlantCardKey';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H2, P1 } from '@/styles/text';
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
  AddButtonContainer,
  DesktopOnlySearchBar,
  DesktopOnlySearchBarContainer,
  FilterAndSearchBarContainer,
  FilterContainer,
  HeaderButton,
  InfoButton,
  NumberSelectedPlants,
  NumberSelectedPlantsContainer,
  PlantGridContainer,
  ResponsiveBox,
  ResponsiveH1,
  ResponsiveSearchBar,
  ResponsiveSearchBarContainer,
  ResponsiveSmallButton,
  SelectModeBox,
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
  const { profileData, profileReady, setPlantsToAdd } = useProfile();
  const { userId, loading: authLoading } = useAuth();

  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view');

  useEffect(() => {
    if (viewParam === 'all' || viewParam === 'myPlants') {
      setViewingOption(viewParam);
    }
  }, [viewParam]);

  const handleMyGardenOrAllView = (option: 'myPlants' | 'all') => {
    setViewingOption(option);
    router.push(`?view=${option}`);
  };

  const [viewingOption, setViewingOption] = useState<'myPlants' | 'all'>(
    'myPlants',
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPlants, setSelectedPlants] = useState<Plant[]>([]);
  const [ownedPlants, setOwnedPlants] = useState<OwnedPlant[]>([]);
  const [isCardKeyOpen, setIsCardKeyOpen] = useState<boolean>(false);
  const cardKeyRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const userState = profileData?.us_state ?? null;

  const profileAndAuthReady = profileReady && !authLoading;

  const anyFilterActive =
    selectedGrowingSeason.length > 0 ||
    selectedDifficulty.length > 0 ||
    selectedSunlight.length > 0;

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
      (async () => {
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
        setIsLoaded(true);
        setOwnedPlants(ownedPlants);
      })();
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
    return ownedPlants
      .filter(
        ownedPlant =>
          checkGrowingSeason(selectedGrowingSeason, ownedPlant.plant) &&
          checkSunlight(selectedSunlight, ownedPlant.plant) &&
          checkDifficulty(selectedDifficulty, ownedPlant.plant) &&
          checkSearchTerm(searchTerm, ownedPlant.plant),
      )
      .sort((a, b) => a.plant.plant_name.localeCompare(b.plant.plant_name));
  }, [
    ownedPlants,
    selectedDifficulty,
    selectedSunlight,
    selectedGrowingSeason,
    searchTerm,
  ]);

  // Handle Button Clicks
  function handleUserPlantCardClick(ownedPlant: OwnedPlant) {
    router.push(`${CONFIG.userPlant}/${ownedPlant.userPlantId}`);
  }

  function handlePlantCardClick(plant: Plant) {
    if (inAddMode) {
      if (selectedPlants.includes(plant)) {
        setSelectedPlants(selectedPlants.filter(item => item !== plant));
      } else {
        setSelectedPlants([...selectedPlants, plant]);
      }
    } else {
      router.push(`${CONFIG.generalPlant}/${plant.id}?view=${viewingOption}`);
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

  // Helper Components
  function MainBody() {
    // assume auth and profile are both ready
    // Not logged in
    if (!userId) {
      return (
        <ErrorScreen
          message="Log in to view all plants"
          handleClick={() => {
            router.push(CONFIG.login);
          }}
          buttonText="Log In"
        />
      );
    }

    // Not onboarded
    if (!profileData) {
      return (
        <ErrorScreen
          message="Complete your profile to view all plants"
          handleClick={() => {
            router.push(CONFIG.onboarding);
          }}
          buttonText="Go To Onboarding"
        />
      );
    }

    // Onboarded and Logged in: Normal Screen
    return (
      <>
        <Flex $justify="between" $pb="12px">
          <ViewSelection>
            <HeaderButton
              $isCurrentMode={viewingOption !== 'all'}
              onClick={() => handleMyGardenOrAllView('myPlants')}
            >
              My Garden
            </HeaderButton>
            <HeaderButton
              $isCurrentMode={viewingOption === 'all'}
              onClick={() => handleMyGardenOrAllView('all')}
            >
              All
            </HeaderButton>
          </ViewSelection>
          {/* Select/Cancel toggles Add Mode; appears in All plants only*/}
          {viewingOption === 'all' &&
            (inAddMode ? (
              <SmallButton
                $secondaryColor={COLORS.errorRed}
                onClick={handleCancelAddMode}
              >
                Cancel
              </SmallButton>
            ) : (
              <SmallButton
                $primaryColor={COLORS.shrub}
                $secondaryColor="white"
                onClick={() => setInAddMode(true)}
              >
                Select
              </SmallButton>
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
          isLoaded === true ? (
            <ErrorScreen
              message="Your plant list is empty"
              handleClick={() => {
                setViewingOption('all');
              }}
              buttonText="Add Plants"
            />
          ) : (
            <Flex $justify="center" $align="center" $h="30rem">
              <H2>Loading...</H2>
            </Flex>
          )
        ) : filteredUserPlantList.length === 0 ? (
          <ErrorScreen
            message="No Matching Plants"
            handleClick={() => {
              clearFilters();
              setSearchTerm('');
            }}
            buttonText="Clear Filters & Search"
          />
        ) : (
          <PlantGridContainer>
            {filteredUserPlantList.map(ownedPlant => (
              <PlantCard
                key={ownedPlant.userPlantId}
                plant={ownedPlant.plant}
                canSelect={false}
                onClick={() => handleUserPlantCardClick(ownedPlant)}
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
          <ErrorScreen
            message="No Matching Plants"
            handleClick={() => {
              clearFilters();
              setSearchTerm('');
            }}
            buttonText="Clear Filters & Search"
          />
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
          <AddButtonContainer>
            <Button
              $primaryColor={COLORS.shrub}
              $width="170px"
              onClick={handleAddPlants}
              disabled={!selectedPlants.length}
            >
              {selectedPlants.length ? 'Add to My Garden' : 'Select Plants'}
            </Button>
          </AddButtonContainer>
        )}
      </>
    );
  }

  function ErrorScreen({
    message,
    handleClick,
    buttonText,
  }: {
    message: string;
    handleClick: () => void;
    buttonText: string;
  }) {
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
        <P1 $color={COLORS.midgray}>{message}</P1>
        <Button
          $primaryColor={COLORS.shrub}
          $width="170px"
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </Flex>
    );
  }

  const plantPluralityString = selectedPlants.length > 1 ? 'Plants' : 'Plant';

  // close plant card key when clicking outside, even on info button
  const handleClickOutside = (event: MouseEvent) => {
    if (
      cardKeyRef.current &&
      !cardKeyRef.current.contains(event.target as Node) &&
      infoButtonRef.current &&
      !infoButtonRef.current.contains(event.target as Node)
    ) {
      setIsCardKeyOpen(false);
    }
  };

  // handle clicking outside PlantCardKey to close it if open
  useEffect(() => {
    if (isCardKeyOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCardKeyOpen]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <TopRowContainer>
        <Flex $direction="row" $gap="10px" $align="center">
          <ResponsiveH1 $color={COLORS.shrub} $fontWeight={500}>
            View Plants
          </ResponsiveH1>
          <div style={{ position: 'relative' }}>
            <InfoButton
              onClick={() => setIsCardKeyOpen(!isCardKeyOpen)}
              ref={infoButtonRef}
            >
              <Icon type="info" />
            </InfoButton>
            {isCardKeyOpen && (
              <div ref={cardKeyRef}>
                <PlantCardKey />
              </div>
            )}
          </div>
        </Flex>
        <ResponsiveSearchBarContainer>
          <ResponsiveSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </ResponsiveSearchBarContainer>
        <FilterAndSearchBarContainer>
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

            {anyFilterActive && (
              <ResponsiveSmallButton
                $secondaryColor={COLORS.shrub}
                onClick={clearFilters}
              >
                Clear Filters
              </ResponsiveSmallButton>
            )}
          </FilterContainer>
          <DesktopOnlySearchBarContainer>
            <DesktopOnlySearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </DesktopOnlySearchBarContainer>
        </FilterAndSearchBarContainer>
      </TopRowContainer>
      <SelectModeBox $h="24px">
        {viewingOption === 'all' && inAddMode ? (
          <NumberSelectedPlantsContainer>
            <NumberSelectedPlants>
              {selectedPlants.length
                ? `${selectedPlants.length} ${plantPluralityString} Selected`
                : 'Select Plants'}
            </NumberSelectedPlants>
          </NumberSelectedPlantsContainer>
        ) : null}
      </SelectModeBox>
      <ResponsiveBox $px="24px" $pb="32px">
        {/* Plant Cards and Body */}
        {!profileAndAuthReady ? <>Loading</> : <MainBody />}
      </ResponsiveBox>
    </div>
  );
}
