'use client';

import React, { useState } from 'react';
import { upsertProfile } from '@/api/supabase/queries/profiles';
import { Profile } from '@/types/schema';

// Define the possible options for each question
const states = ['Tennessee', 'Missouri'];
const gardenTypes = ['Individual', 'Community', 'School'];
const plotOptions = [
  { label: 'yes', value: true },
  { label: 'no', value: false },
];
//Interfaces and props to avoid typ errors on Lint
interface StateSelectionProps {
  selectedState: string;
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
}

interface GardenTypeSelectionProps {
  selectedGardenType: string;
  setSelectedGardenType: React.Dispatch<React.SetStateAction<string>>;
}

interface PlotSelectionProps {
  selectedPlot: boolean | null;
  setSelectedPlot: React.Dispatch<React.SetStateAction<boolean>>;
}

// Select State
const StateSelection: React.FC<StateSelectionProps> = ({
  selectedState,
  setSelectedState,
}) => {
  return (
    <div>
      <h2>Which state do you live in?</h2>
      <select
        value={selectedState}
        onChange={e => setSelectedState(e.target.value)}
      >
        <option value="" disabled>
          Select a state
        </option>
        {states.map(state => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

// Step 2: Select garden type

const GardenTypeSelection: React.FC<GardenTypeSelectionProps> = ({
  selectedGardenType,
  setSelectedGardenType,
}) => {
  return (
    <div>
      <h2>What type of garden do you want to create?</h2>
      {gardenTypes.map(type => (
        <label key={type}>
          <input
            type="radio"
            name="gardenType"
            value={type}
            checked={selectedGardenType === type}
            onChange={e => setSelectedGardenType(e.target.value)}
          />
          {type}
        </label>
      ))}
    </div>
  );
};

// Step 3: Do you have a plot?
const PlotSelection: React.FC<PlotSelectionProps> = ({
  selectedPlot,
  setSelectedPlot,
}) => {
  return (
    <div>
      <h2>Do you already have a plot?</h2>
      {plotOptions.map(option => (
        <label key={option.label}>
          <input
            type="radio"
            name="plot"
            value={String(option.value)}
            checked={selectedPlot === option.value}
            onChange={() => setSelectedPlot(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

// Main Onboarding Component
const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedGardenType, setSelectedGardenType] = useState<string>('');
  const [selectedPlot, setSelectedPlot] = useState<boolean>(false);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const profile: Profile = {
      user_id: '2abd7296-374a-42d1-bb4f-b813da1615ae',
      state: selectedState,
      user_type: selectedGardenType,
      has_plot: selectedPlot,
    };
    try {
      upsertProfile(profile);
    } catch (error) {
      console.error('Error upserting profile:', error);
      throw new Error('Error upserting profile');
    } finally {
      //TODO: Remove console log.
      console.log('Submitted data: ', profile);
    }
    // Handle form submission, e.g., send to a server or display a confirmation
  };

  return (
    <div>
      {step === 1 && (
        <StateSelection
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
      )}
      {step === 2 && (
        <GardenTypeSelection
          selectedGardenType={selectedGardenType}
          setSelectedGardenType={setSelectedGardenType}
        />
      )}
      {step === 3 && (
        <PlotSelection
          selectedPlot={selectedPlot}
          setSelectedPlot={setSelectedPlot}
        />
      )}

      <div>
        {step > 1 && <button onClick={handleBack}>Back</button>}
        {step < 3 && (
          <button onClick={handleNext} disabled={!selectedState && step === 1}>
            Next
          </button>
        )}
        {step === 3 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default OnboardingFlow;
