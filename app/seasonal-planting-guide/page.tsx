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

  const [growingSeason, setGrowingSeason] = useState<string>('');
  const [harvestSeason, setHarvestSeason] = useState<string>('');
  const [plantingType, setPlantingType] = useState<string>('');

  const clearFilters = () => {
    setGrowingSeason('');
    setHarvestSeason('');
    setPlantingType('');
  };

  return (
    <div>
      <FilterDropdown
        name="growingSeason"
        id="growingSeason"
        value={growingSeason}
        setStateAction={setGrowingSeason}
        options={growingSeasonOptions}
        placeholder="Growing Season"
      />

      <FilterDropdown
        name="harvestSeason"
        id="harvestSeason"
        value={harvestSeason}
        setStateAction={setHarvestSeason}
        options={harvestSeasonOptions}
        placeholder="Harvest Season"
      />

      <FilterDropdown
        name="plantingType"
        id="plantingType"
        value={plantingType}
        setStateAction={setPlantingType}
        options={plantingTypeOptions}
        placeholder="Planting Type"
      />

      <button onClick={clearFilters}>Clear filters</button>

      <PlantList
        growing_season={growingSeason}
        harvest_season={harvestSeason}
        planting_type={plantingType}
      />
    </div>
  );
};

export default SeasonalPlantingGuide;
