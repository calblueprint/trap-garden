'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  getAllPlants,
  getMatchingPlantForUserPlant,
} from '@/api/supabase/queries/plants';
import { getCurrentUserPlantsByUserId } from '@/api/supabase/queries/userPlants';
import { Button, SmallButton } from '@/components/Buttons';
import Loader from '@/components/CircularLoader';
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

/* ─── static dropdown choices ─────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────── */

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const { profileData, profileReady, setPlantsToAdd } = useProfile();
  const { userId, loading: authLoading } = useAuth();

  /* ─── sync ?view param with state ───────────────────────────────── */
  const [viewingOption, setViewingOption] = useState<'myPlants' | 'all'>(
    'myPlants',
  );

  useEffect(() => {
    const v = searchParams.get('view');
    if (v === 'all' || v === 'myPlants') {
      setViewingOption(v);
    } else {
      setViewingOption('myPlants');
      router.replace('?view=myPlants');
    }
  }, [searchParams, router]);

  function switchView(option: 'myPlants' | 'all') {
    setViewingOption(option);
    startTransition(() => router.push(`?view=${option}`));
  }

  /* ─── local state ───────────────────────────────────────────────── */
  const [inAddMode, setInAddMode] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [ownedPlants, setOwnedPlants] = useState<OwnedPlant[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedDifficulty, setSelectedDifficulty] = useState<
    DropdownOption[]
  >([]);
  const [selectedSunlight, setSelectedSunlight] = useState<
    DropdownOption<SunlightEnum>[]
  >([]);
  const [selectedGrowingSeason, setSelectedGrowingSeason] = useState<
    DropdownOption<SeasonEnum>[]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlants, setSelectedPlants] = useState<Plant[]>([]);

  const [isCardKeyOpen, setIsCardKeyOpen] = useState(false);
  const cardKeyRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  const userState = profileData?.us_state ?? null;
  const profileAndAuthReady = profileReady && !authLoading;

  /* ─── fetch all plants for the user's state ─────────────────────── */
  useEffect(() => {
    if (profileReady && userState) {
      (async () => {
        const all = await getAllPlants();
        setPlants(
          all
            .filter(p => p.us_state === userState)
            .sort((a, b) => a.plant_name.localeCompare(b.plant_name)),
        );
      })();
    }
  }, [profileReady, userState]);

  /* ─── fetch user's own plants ───────────────────────────────────── */
  useEffect(() => {
    if (!authLoading && userId) {
      (async () => {
        const userPlants = await getCurrentUserPlantsByUserId(userId);
        const owned = await Promise.all(
          userPlants.map(async up => ({
            userPlantId: up.id,
            plant: await getMatchingPlantForUserPlant(up),
          })),
        );
        setOwnedPlants(owned);
        setIsLoaded(true);
      })();
    }
  }, [userId, authLoading]);

  /* ─── helpers ───────────────────────────────────────────────────── */
  const clearFilters = () => {
    setSelectedDifficulty([]);
    setSelectedSunlight([]);
    setSelectedGrowingSeason([]);
  };

  const filteredPlantList = useMemo(
    () =>
      plants.filter(
        p =>
          checkGrowingSeason(selectedGrowingSeason, p) &&
          checkSunlight(selectedSunlight, p) &&
          checkDifficulty(selectedDifficulty, p) &&
          checkSearchTerm(searchTerm, p),
      ),
    [
      plants,
      selectedDifficulty,
      selectedSunlight,
      selectedGrowingSeason,
      searchTerm,
    ],
  );

  const filteredUserPlantList = useMemo(
    () =>
      ownedPlants
        .filter(
          op =>
            checkGrowingSeason(selectedGrowingSeason, op.plant) &&
            checkSunlight(selectedSunlight, op.plant) &&
            checkDifficulty(selectedDifficulty, op.plant) &&
            checkSearchTerm(searchTerm, op.plant),
        )
        .sort((a, b) => a.plant.plant_name.localeCompare(b.plant.plant_name)),
    [
      ownedPlants,
      selectedDifficulty,
      selectedSunlight,
      selectedGrowingSeason,
      searchTerm,
    ],
  );

  /* ─── navigation handlers (wrapped in startTransition) ──────────── */
  const push = (href: string) => startTransition(() => router.push(href));

  function handleUserPlantCardClick(op: OwnedPlant) {
    push(`${CONFIG.userPlant}/${op.userPlantId}`);
  }

  function handlePlantCardClick(p: Plant) {
    if (inAddMode) {
      setSelectedPlants(curr =>
        curr.includes(p) ? curr.filter(x => x !== p) : [...curr, p],
      );
    } else {
      push(`${CONFIG.generalPlant}/${p.id}`);
    }
  }

  function handleAddPlants() {
    setPlantsToAdd(selectedPlants);
    push(CONFIG.addDetails);
  }

  /* ─── click-outside logic for the PlantCardKey popover ───────────── */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        cardKeyRef.current &&
        !cardKeyRef.current.contains(e.target as Node) &&
        infoButtonRef.current &&
        !infoButtonRef.current.contains(e.target as Node)
      ) {
        setIsCardKeyOpen(false);
      }
    }
    if (isCardKeyOpen)
      document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCardKeyOpen]);

  /* ─── quick booleans ─────────────────────────────────────────────── */
  const anyFilterActive =
    selectedDifficulty.length ||
    selectedSunlight.length ||
    selectedGrowingSeason.length;

  const plantPlural = selectedPlants.length === 1 ? 'Plant' : 'Plants';

  /* ─── Error screen component ─────────────────────────────────────── */
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
        <Icon type="sprout" />
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

  /* ─── Main display blocks (unchanged except switchView) ──────────── */

  function MyPlantsDisplay() {
    if (!isLoaded)
      return (
        <Flex $justify="center" $align="center" $h="30rem">
          <H2>Loading…</H2>
        </Flex>
      );

    if (!ownedPlants.length)
      return (
        <ErrorScreen
          message="Your plant list is empty"
          handleClick={() => switchView('all')}
          buttonText="Add Plants"
        />
      );

    if (!filteredUserPlantList.length)
      return (
        <ErrorScreen
          message="No Matching Plants"
          handleClick={() => {
            clearFilters();
            setSearchTerm('');
          }}
          buttonText="Clear Filters & Search"
        />
      );

    return (
      <PlantGridContainer>
        {filteredUserPlantList.map(op => (
          <PlantCard
            key={op.userPlantId}
            plant={op.plant}
            canSelect={false}
            onClick={() => handleUserPlantCardClick(op)}
          />
        ))}
      </PlantGridContainer>
    );
  }

  function AllPlantsDisplay() {
    return (
      <>
        {!filteredPlantList.length ? (
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
            {filteredPlantList.map(p => (
              <PlantCard
                key={p.id}
                plant={p}
                canSelect={inAddMode}
                isSelected={selectedPlants.includes(p)}
                onClick={() => handlePlantCardClick(p)}
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

  /* ─── MainBody picks view vs filters ─────────────────────────────── */
  function MainBody() {
    if (!userId)
      return (
        <ErrorScreen
          message="Log in to view all plants"
          handleClick={() => push(CONFIG.login)}
          buttonText="Log In"
        />
      );

    if (!profileData)
      return (
        <ErrorScreen
          message="Complete your profile to view all plants"
          handleClick={() => push(CONFIG.onboarding)}
          buttonText="Go To Onboarding"
        />
      );

    return (
      <>
        {/* top toggle row */}
        <Flex $justify="between" $pb="12px">
          <ViewSelection>
            <HeaderButton
              $isCurrentMode={viewingOption !== 'all'}
              onClick={() => switchView('myPlants')}
            >
              My Garden
            </HeaderButton>
            <HeaderButton
              $isCurrentMode={viewingOption === 'all'}
              onClick={() => switchView('all')}
            >
              All
            </HeaderButton>
          </ViewSelection>

          {/* select / cancel for Add-mode */}
          {viewingOption === 'all' &&
            (inAddMode ? (
              <SmallButton
                $secondaryColor={COLORS.errorRed}
                onClick={() => {
                  setSelectedPlants([]);
                  setInAddMode(false);
                }}
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

  /* ────────────────────────── JSX ─────────────────────────────────── */
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* loader overlay */}
      {(!profileAndAuthReady || isPending) && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.55)',
            zIndex: 10000,
          }}
        >
          <Loader />
        </div>
      )}

      {/* top bar with title + info */}
      <TopRowContainer>
        <Flex $direction="row" $gap="10px" $align="center">
          <ResponsiveH1 $color={COLORS.shrub} $fontWeight={500}>
            View Plants
          </ResponsiveH1>

          {/* info pop-over */}
          <div style={{ position: 'relative' }}>
            <InfoButton
              onClick={() => setIsCardKeyOpen(x => !x)}
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

        {/* search + filters */}
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

      {/* select-mode message row */}
      <SelectModeBox $h="24px">
        {viewingOption === 'all' && inAddMode && (
          <NumberSelectedPlantsContainer>
            <NumberSelectedPlants>
              {selectedPlants.length
                ? `${selectedPlants.length} ${plantPlural} Selected`
                : 'Select Plants'}
            </NumberSelectedPlants>
          </NumberSelectedPlantsContainer>
        )}
      </SelectModeBox>

      {/* body */}
      <ResponsiveBox $px="24px" $pb="32px">
        {profileAndAuthReady && !isPending && <MainBody />}
      </ResponsiveBox>
    </div>
  );
}
