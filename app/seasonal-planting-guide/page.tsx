'use client';

import React, { useState } from 'react';
import FilterDropdownMultiple from '@/components/FilterDropdownMultiple';
import FilterDropdownSingle from '@/components/FilterDropdownSingle';
import Icon from '@/components/Icon';
import { PlantList } from '@/components/PlantList';
import SearchBar from '@/components/SearchBar';
import COLORS from '@/styles/colors';
import { H1, H3 } from '@/styles/text';
import { DropdownOption } from '@/types/schema';
import {
  FilterContainer,
  HeaderContainer,
  PageContainer,
  PageTitle,
  PlantListContainer,
  StateOptionsContainer,
} from './styles';

export default function SeasonalPlantingGuide() {
  const growingSeasonOptions: DropdownOption[] = [
    { label: 'Spring', value: 'SPRING' },
    { label: 'Summer', value: 'SUMMER' },
    { label: 'Fall', value: 'FALL' },
    { label: 'Winter', value: 'WINTER' },
  ];
  const harvestSeasonOptions: DropdownOption[] = [
    { label: 'Spring', value: 'SPRING' },
    { label: 'Summer', value: 'SUMMER' },
    { label: 'Fall', value: 'FALL' },
    { label: 'Winter', value: 'WINTER' },
  ];
  const plantingTypeOptions: DropdownOption[] = [
    { label: 'Start Seeds Indoors', value: 'Start Seeds Indoors' },
    { label: 'Start Seeds Outdoors', value: 'Start Seeds Outdoors' },
    {
      label: 'Plant Seedlings/Transplant Outdoors',
      value: 'Plant Seedlings/Transplant Outdoors',
    },
  ];
  const usStateOptions: DropdownOption[] = [
    { label: 'Tennessee', value: 'TENNESSEE' },
    { label: 'Missouri', value: 'MISSOURI' },
  ];

  const [selectedGrowingSeason, setSelectedGrowingSeason] = useState<
    DropdownOption[]
  >([]);
  const [selectedHarvestSeason, setSelectedHarvestSeason] = useState<
    DropdownOption[]
  >([]);
  const [selectedPlantingType, setSelectedPlantingType] = useState<
    DropdownOption[]
  >([]);
  const [selectedUsState, setSelectedUsState] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const clearFilters = () => {
    setSelectedGrowingSeason([]);
    setSelectedHarvestSeason([]);
    setSelectedPlantingType([]);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <PageTitle>
          <H1 $color={COLORS.shrub} $align="left">
            Planting Timeline
          </H1>
          <Icon type="info" />
        </PageTitle>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterContainer>
          <FilterDropdownSingle
            name="usState"
            id="usState"
            value={selectedUsState}
            setStateAction={setSelectedUsState}
            placeholder="US State"
            options={usStateOptions}
          />

          <FilterDropdownMultiple
            value={selectedGrowingSeason}
            setStateAction={setSelectedGrowingSeason}
            options={growingSeasonOptions}
            placeholder="Growing Season"
          />

          <FilterDropdownMultiple
            value={selectedHarvestSeason}
            setStateAction={setSelectedHarvestSeason}
            options={harvestSeasonOptions}
            placeholder="Harvest Season"
          />

          <FilterDropdownMultiple
            value={selectedPlantingType}
            setStateAction={setSelectedPlantingType}
            options={plantingTypeOptions}
            placeholder="Planting Type"
          />

          <button onClick={clearFilters}>Clear filters</button>
        </FilterContainer>
      </HeaderContainer>
      {!selectedUsState ? (
        <StateOptionsContainer>
          <H3 $color={COLORS.shrub}>Choose Your State</H3>
          <FilterDropdownSingle
            name="usState"
            id="usState"
            value={selectedUsState}
            setStateAction={setSelectedUsState}
            placeholder="State"
            options={usStateOptions}
          />
        </StateOptionsContainer>
      ) : (
        <PlantListContainer>
          <PlantList
            growingSeasonFilterValue={selectedGrowingSeason}
            harvestSeasonFilterValue={selectedHarvestSeason}
            plantingTypeFilterValue={selectedPlantingType}
            usStateFilterValue={selectedUsState}
            searchTerm={searchTerm}
          />
        </PlantListContainer>
      )}
    </PageContainer>
  );
}
