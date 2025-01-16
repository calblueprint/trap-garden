'use client';

import React, { useEffect, useState } from 'react';
import { SmallButton } from '@/components/Buttons';
import FilterDropdownMultiple from '@/components/FilterDropdownMultiple';
import FilterDropdownSingle from '@/components/FilterDropdownSingle';
import { PlantCalendarList } from '@/components/PlantCalendarList';
import SearchBar from '@/components/SearchBar';
import SeasonColorKey from '@/components/SeasonColorKey';
import COLORS from '@/styles/colors';
import { Box } from '@/styles/containers';
import { H1, H3 } from '@/styles/text';
import { DropdownOption, PlantingTypeEnum, SeasonEnum } from '@/types/schema';
import {
  plantingTypeOptions,
  seasonOptions,
  usStateOptions,
} from '@/utils/dropdownOptions';
import { toTitleCase } from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
import {
  FilterContainer,
  HeaderContainer,
  PageContainer,
  PageTitle,
  StateOptionsContainer,
  VerticalSeparator,
} from './styles';

// (static) filter options imported from utils/dropdownOptions
const growingSeasonOptions = seasonOptions;
const harvestSeasonOptions = seasonOptions;

export default function SeasonalPlantingGuide() {
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
  };

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
          <H1 $color={COLORS.shrub} $align="left">
            Planting Timeline
          </H1>
        </PageTitle>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
          <SmallButton $secondaryColor={COLORS.shrub} onClick={clearFilters}>
            Clear Filters
          </SmallButton>
        </FilterContainer>
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
          />
        </Box>
      )}
    </PageContainer>
  );
}
