'use client';

import React, { useState } from 'react';
import FilterDropdown from '@/components/FilterDropdown';
import { PlantList } from '@/components/PlantList';
import { DropdownOption } from '@/types/schema';

const SeasonalPlantingGuide = () => {
  const growingSeasonOptions = ['Spring', 'Summer', 'Fall', 'Winter'];
  const harvestSeasonOptions = ['Spring', 'Summer', 'Fall', 'Winter'];
  const plantingTypeOptions = [
    'Start Seeds Indoors',
    'Start Seeds Outdoors',
    'Plant Seedlings/Transplant Outdoors',
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

  const clearFilters = () => {
    setSelectedGrowingSeason([]);
    setSelectedHarvestSeason([]);
    setSelectedPlantingType([]);
  };

  return (
    <div>
      <FilterDropdown
        value={selectedGrowingSeason}
        setStateAction={setSelectedGrowingSeason}
        options={growingSeasonOptions}
        placeholder="Growing Season"
      />

      <FilterDropdown
        value={selectedHarvestSeason}
        setStateAction={setSelectedHarvestSeason}
        options={harvestSeasonOptions}
        placeholder="Harvest Season"
      />

      <FilterDropdown
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
