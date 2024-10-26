'use client';

import React, { useState } from 'react';
import FilterDropdown from '@/components/FilterDropdown';
import { PlantList } from '@/components/PlantList';

const SeasonalPlantingGuide = () => {
  const growingSeasonOptions = ['Spring', 'Summer', 'Fall', 'Winter'];
  const harvestSeasonOptions = ['Spring', 'Summer', 'Fall', 'Winter'];
  const plantingTypeOptions = [
    'Start Seeds Indoors',
    'Start Seeds Outdoors',
    'Plant Seedlings/Transplant Outdoors',
  ];

  const [selectedGrowingSeason, setSelectedGrowingSeason] =
    useState<string>('');
  const [selectedHarvestSeason, setSelectedHarvestSeason] =
    useState<string>('');
  const [selectedPlantingType, setSelectedPlantingType] = useState<string>('');

  const clearFilters = () => {
    setSelectedGrowingSeason('');
    setSelectedHarvestSeason('');
    setSelectedPlantingType('');
  };

  return (
    <div>
      <FilterDropdown
        name="growingSeason"
        id="growingSeason"
        value={selectedGrowingSeason}
        setStateAction={setSelectedGrowingSeason}
        options={growingSeasonOptions}
        placeholder="Growing Season"
      />

      <FilterDropdown
        name="harvestSeason"
        id="harvestSeason"
        value={selectedHarvestSeason}
        setStateAction={setSelectedHarvestSeason}
        options={harvestSeasonOptions}
        placeholder="Harvest Season"
      />

      <FilterDropdown
        name="plantingType"
        id="plantingType"
        value={selectedPlantingType}
        setStateAction={setSelectedPlantingType}
        options={plantingTypeOptions}
        placeholder="Planting Type"
      />

      <button onClick={clearFilters}>Clear filters</button>

      <PlantList
        growingSeasonFilterValue={selectedGrowingSeason}
        harvestSeasonFilterValue={selectedHarvestSeason}
        plantingTypeFilterValue={selectedPlantingType}
      />
    </div>
  );
};

export default SeasonalPlantingGuide;
