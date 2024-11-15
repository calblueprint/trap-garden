'use client';

import React, { useState } from 'react';
import FilterDropdownMultiple from '@/components/FilterDropdownMultiple';
import FilterDropdownSingle from '@/components/FilterDropdownSingle';
import { PlantList } from '@/components/PlantList';
import SearchBar from '@/components/SearchBar';
import { DropdownOption } from '@/types/schema';
import {
  FilterContainer,
  HeaderContainer,
  PageContainer,
  PageTitle,
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
      {!selectedUsState ? (
        <>
          <p>Please select a US state to view planting information.</p>
          <StateOptionsContainer>
            <FilterDropdownSingle
              name="usState"
              id="usState"
              value={selectedUsState}
              setStateAction={setSelectedUsState}
              placeholder="US State"
              options={usStateOptions}
            />
          </StateOptionsContainer>
        </>
      ) : (
        <>
          <HeaderContainer>
            <PageTitle>Seasonality Chart</PageTitle>
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

          <PlantList
            growingSeasonFilterValue={selectedGrowingSeason}
            harvestSeasonFilterValue={selectedHarvestSeason}
            plantingTypeFilterValue={selectedPlantingType}
            usStateFilterValue={selectedUsState}
            searchTerm={searchTerm}
          />
        </>
      )}
    </PageContainer>
  );
}
