'use client';

import React, { useState } from 'react';
import { UUID } from 'crypto';
import { Profile, UserTypeEnum } from '@/types/schema';
import { useProfile } from '@/utils/ProfileProvider';

// Define the possible options for each question
type Options<T> = {
  label: string; // Represents the text for UI
  value: T; // Represents the value stored in the DB
};
const states: Options<string>[] = [
  { label: 'Tennessee', value: 'TENNESSE' },
  { label: 'Missouri', value: 'MISSOURI' },
];
const gardenTypes: Options<UserTypeEnum>[] = [
  { label: 'Individual', value: 'INDIV' },
  { label: 'School', value: 'SCHOOL' },
  { label: 'Community', value: 'ORG' },
];
const plotOptions: Options<boolean>[] = [
  { label: 'yes', value: true },
  { label: 'no', value: false },
];
const placeholderUserId: UUID = '2abd7296-374a-42d1-bb4f-b813da1615ae';

//Interfaces and props to avoid typ errors on Lint
interface StateSelectionProps {
  selectedState: string;
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
}

interface GardenTypeSelectionProps {
  selectedGardenType: UserTypeEnum | null;
  setSelectedGardenType: React.Dispatch<
    React.SetStateAction<UserTypeEnum | null>
  >;
}

interface PlotSelectionProps {
  selectedPlot: boolean | null;
  setSelectedPlot: React.Dispatch<React.SetStateAction<boolean>>;
}

// Select State
const StateSelection = ({
  selectedState,
  setSelectedState,
}: StateSelectionProps) => {
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
          <option key={state.label} value={String(state.value)}>
            {state.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Step 2: Select garden type

const GardenTypeSelection = ({
  selectedGardenType,
  setSelectedGardenType,
}: GardenTypeSelectionProps) => {
  return (
    <div>
      <h2>What type of garden do you want to create?</h2>
      {gardenTypes.map(type => (
        <label key={type.label}>
          <input
            type="radio"
            name="gardenType"
            value={type.value}
            checked={selectedGardenType === type.value}
            onChange={e =>
              setSelectedGardenType(e.target.value as UserTypeEnum)
            }
          />
          {type.label}
        </label>
      ))}
    </div>
  );
};

// Step 3: Do you have a plot?
const PlotSelection = ({
  selectedPlot,
  setSelectedPlot,
}: PlotSelectionProps) => {
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
  const { setProfile, updateHasPlot } = useProfile();
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedGardenType, setSelectedGardenType] =
    useState<UserTypeEnum | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<boolean>(false);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleSubmit = async () => {
    if (!selectedGardenType) {
      console.error('Garden type is required to submit the profile.');
      return;
    }
    try {
      const profileToUpload: Profile = {
        user_id: placeholderUserId,
        us_state: selectedState,
        user_type: selectedGardenType,
      };

      await setProfile(profileToUpload);
      await updateHasPlot(selectedPlot); // Update has_plot
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };
  // Handle form submission, e.g., send to a server or display a confirmation

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
