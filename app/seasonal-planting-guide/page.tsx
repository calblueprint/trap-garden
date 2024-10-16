'use client';

import React, { useState } from 'react';
import FilterDropdown from '@/components/FilterDropdown';
import { PlantList } from '@/components/PlantList';

interface SeasonalPlantingGuideProps {}

const SeasonalPlantingGuide = (props: SeasonalPlantingGuideProps) => {
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

  return (
    <div>
      <FilterDropdown
        name="growingSeason"
        id="growingSeason"
        setStateAction={setGrowingSeason}
        options={growingSeasonOptions}
        placeholder="Growing Season"
      />

      <FilterDropdown
        name="harvestSeason"
        id="harvestSeason"
        setStateAction={setHarvestSeason}
        options={harvestSeasonOptions}
        placeholder="Harvest Season"
      />

      <FilterDropdown
        name="plantingType"
        id="plantingType"
        setStateAction={setPlantingType}
        options={plantingTypeOptions}
        placeholder="Planting Type"
      />

      <PlantList
        growing_season={growingSeason}
        harvest_season={harvestSeason}
        planting_type={plantingType}
      />
    </div>
  );
};

export default SeasonalPlantingGuide;
