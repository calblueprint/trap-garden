'use client';

import React, { useEffect, useState } from 'react';
import { getMatchingPlantForUserPlant } from '@/api/supabase/queries/plants';
import { getCurrentUserPlantsByUserId } from '@/api/supabase/queries/userPlants';
import FilterDropdownMultiple from '@/components/FilterDropdownMultiple';
import FilterDropdownSingle from '@/components/FilterDropdownSingle';
import Icon from '@/components/Icon';
import { PlantCalendarList } from '@/components/PlantCalendarList';
import SearchBar from '@/components/SearchBar';
import SeasonColorKey from '@/components/SeasonColorKey';
import COLORS from '@/styles/colors';
import { Box } from '@/styles/containers';
import { H3 } from '@/styles/text';
import {
  DropdownOption,
  OwnedPlant,
  PlantingTypeEnum,
  SeasonEnum,
} from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import {
  plantingTypeOptions,
  seasonOptions,
  usStateOptions,
} from '@/utils/dropdownOptions';
import { toTitleCase } from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
import {
  DesktopSearchContainer,
  FilterContainer,
  FilterRowContainer,
  FilterText,
  HeaderContainer,
  PageContainer,
  PageTitle,
  SearchBarWrapper,
  ShowPlantsButton,
  StateOptionsContainer,
  Title,
  VerticalSeparator,
  WhiteIcon,
} from './styles';

// (static) filter options imported from utils/dropdownOptions
const growingSeasonOptions = seasonOptions;
const harvestSeasonOptions = seasonOptions;

export default function SeasonalPlantingGuide() {
  const { userId } = useAuth();
  const { profileData, profileReady } = useProfile();
  const [selectedGrowingSeason, setSelectedGrowingSeason] = useState<
    DropdownOption<SeasonEnum>[]
  >([]);
  const [selectedHarvestSeason, setSelectedHarvestSeason] = useState<
    DropdownOption<SeasonEnum>[]
  >([]);
  const [selectedPlantingType, setSelectedPlantingType] = useState<
    DropdownOption<PlantingTypeEnum>[]
  >([]);
  const [selectedUsState, setSelectedUsState] =
    useState<DropdownOption<string> | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const clearFilters = () => {
    setSelectedGrowingSeason([]);
    setSelectedHarvestSeason([]);
    setSelectedPlantingType([]);
    setShowMyPlants(false);
  };

  const clearFiltersAndSearch = () => {
    clearFilters();
    setSearchTerm('');
  };

  const [showMyPlants, setShowMyPlants] = useState(false);
  const anyFilterActive =
    selectedGrowingSeason.length > 0 ||
    selectedHarvestSeason.length > 0 ||
    selectedPlantingType.length > 0 ||
    searchTerm.trim() !== '' ||
    showMyPlants;

  const toggleShowMyPlants = () => {
    setShowMyPlants(!showMyPlants);
  };

  const [myPlantIds, setMyPlantIds] = useState<OwnedPlant[]>([]);

  useEffect(() => {
    if (profileReady && profileData?.user_id) {
      (async () => {
        const fetchedUserPlants = await getCurrentUserPlantsByUserId(
          profileData.user_id,
        );

        const ownedPlants: OwnedPlant[] = await Promise.all(
          fetchedUserPlants.map(async userPlant => {
            const plant = await getMatchingPlantForUserPlant(userPlant);
            return {
              userPlantId: userPlant.id,
              plant,
            };
          }),
        );
        setMyPlantIds(ownedPlants);
      })();
    }
  }, [profileData, profileReady]);

  useEffect(() => {
    if (profileReady && profileData) {
      setSelectedUsState({
        label: toTitleCase(profileData.us_state),
        value: profileData.us_state,
      });
    }
  }, [profileData, profileReady]);

  return (
    <PageContainer>
      <HeaderContainer>
        <PageTitle>
          <Title $color={COLORS.shrub}>Planting Timeline</Title>
        </PageTitle>
        <SearchBarWrapper>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </SearchBarWrapper>
        <FilterRowContainer>
          <FilterContainer>
            <FilterDropdownSingle
              value={selectedUsState}
              setStateAction={setSelectedUsState}
              placeholder="State"
              options={usStateOptions}
              disabled={!selectedUsState}
              small={true}
            />

            {/* vertical bar to separate state and other filters */}
            <VerticalSeparator />
            {userId && (
              <ShowPlantsButton
                onClick={toggleShowMyPlants}
                $primaryColor={showMyPlants ? COLORS.shrub : undefined}
                $secondaryColor={!showMyPlants ? COLORS.shrub : undefined}
              >
                <FilterText $color={!showMyPlants ? COLORS.shrub : 'white'}>
                  My Plants
                </FilterText>
                {showMyPlants ? (
                  <WhiteIcon>
                    <Icon type="leaf" />
                  </WhiteIcon>
                ) : (
                  <Icon type="leaf" />
                )}
              </ShowPlantsButton>
            )}

            <FilterDropdownMultiple
              value={selectedGrowingSeason}
              setStateAction={setSelectedGrowingSeason}
              options={growingSeasonOptions}
              placeholder="Growing Season"
              disabled={!selectedUsState}
            />

            <FilterDropdownMultiple
              value={selectedHarvestSeason}
              setStateAction={setSelectedHarvestSeason}
              options={harvestSeasonOptions}
              placeholder="Harvest Season"
              disabled={!selectedUsState}
            />

            <FilterDropdownMultiple
              value={selectedPlantingType}
              setStateAction={setSelectedPlantingType}
              options={plantingTypeOptions}
              placeholder="Planting Type"
              disabled={!selectedUsState}
            />

            {anyFilterActive && (
              <FilterText
                $color={COLORS.midgray}
                onClick={clearFilters}
                $underline={true}
              >
                Clear All
              </FilterText>
            )}
          </FilterContainer>
          <DesktopSearchContainer>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </DesktopSearchContainer>
        </FilterRowContainer>
      </HeaderContainer>
      {!selectedUsState ? (
        <StateOptionsContainer>
          <H3 $color={COLORS.shrub}>Choose Your State</H3>
          <FilterDropdownSingle
            value={selectedUsState}
            setStateAction={setSelectedUsState}
            placeholder="State"
            options={usStateOptions}
          />
        </StateOptionsContainer>
      ) : (
        <Box $p="20px">
          <SeasonColorKey />
          <PlantCalendarList
            growingSeasonFilterValue={selectedGrowingSeason}
            harvestSeasonFilterValue={selectedHarvestSeason}
            plantingTypeFilterValue={selectedPlantingType}
            usStateFilterValue={selectedUsState}
            searchTerm={searchTerm}
            showMyPlants={showMyPlants}
            myPlantIds={myPlantIds}
            clearFilters={clearFiltersAndSearch}
          />
        </Box>
      )}
    </PageContainer>
  );
}
