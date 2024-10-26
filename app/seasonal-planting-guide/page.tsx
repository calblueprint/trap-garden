'use client';

import React, { useState } from 'react';
import FilterDropdownMultiple from '@/components/FilterDropdownMultiple';
import FilterDropdownSingle from '@/components/FilterDropdownSingle';
import { PlantList } from '@/components/PlantList';
import { DropdownOption } from '@/types/schema';
import {
  FilterContainer,
  PageContainer,
  StateOptionsContainer,
} from './styles';

const SeasonalPlantingGuide = () => {
  const growingSeasonOptions = ['Spring', 'Summer', 'Fall', 'Winter'];
  const harvestSeasonOptions = ['Spring', 'Summer', 'Fall', 'Winter'];
  const plantingTypeOptions = [
    'Start Seeds Indoors',
    'Start Seeds Outdoors',
    'Plant Seedlings/Transplant Outdoors',
  ];
  const usStateOptions = ['Tennessee', 'Missouri'];

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
            {usStateOptions.map(state => (
              <button key={state} onClick={() => setSelectedUsState(state)}>
                {state}
              </button>
            ))}
          </StateOptionsContainer>
        </>
      ) : (
        <>
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

          <PlantList
            growingSeasonFilterValue={selectedGrowingSeason}
            harvestSeasonFilterValue={selectedHarvestSeason}
            plantingTypeFilterValue={selectedPlantingType}
            usStateFilterValue={selectedUsState}
          />
        </>
      )}
    </PageContainer>
  );
};

export default SeasonalPlantingGuide;
