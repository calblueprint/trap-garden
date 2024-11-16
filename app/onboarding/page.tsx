'use client';

import React, { useState } from 'react';
import { UUID } from 'crypto';
import { Profile, UserTypeEnum } from '@/types/schema';
import { useProfile } from '@/utils/ProfileProvider';

// Define the possible options for each question
const states = ['TENNESSEE', 'MISSOURI'];
const gardenTypes: UserTypeEnum[] = ['INDIV', 'SCHOOL', 'ORG'];
const plotOptions = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];
const placeholderUserId: UUID = '0802d796-ace8-480d-851b-d16293c74a21';

//Interfaces and props to avoid typ errors on Lint
interface StateSelectionProps {
  selectedState?: string;
  setSelectedState: (selected: string) => void;
}

interface UserTypeSelectionProps {
  selectedUserType?: UserTypeEnum;
  setSelectedUserType: (selected: UserTypeEnum) => void;
}

interface PlotSelectionProps {
  selectedPlot?: boolean;
  setSelectedPlot: (selected: boolean) => void;
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

// Step 2: Select user type

const UserTypeSelection = ({
  selectedUserType,
  setSelectedUserType,
}: UserTypeSelectionProps) => {
  return (
    <div>
      <h2>What type of garden do you want to create?</h2>
      {gardenTypes.map(type => (
        <label key={type.label}>
          <input
            type="radio"
            name="gardenType"
            value={type}
            checked={selectedUserType === type}
            onChange={e => setSelectedUserType(e.target.value as UserTypeEnum)}
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
            checked={
              typeof selectedPlot === 'undefined'
                ? false
                : selectedPlot === option.value
            }
            onChange={() => setSelectedPlot(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

// Main Onboarding Component
export default function OnboardingFlow() {
  const { setProfile, setHasPlot } = useProfile();
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedUserType, setSelectedUserType] = useState<
    UserTypeEnum | undefined
  >(undefined);
  const [selectedPlot, setSelectedPlot] = useState<boolean | undefined>(
    undefined,
  );

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleSubmit = async () => {
    try {
      const profileToUpload: Profile = {
        user_id: placeholderUserId,
        us_state: selectedState,
        user_type: selectedUserType!,
      };

      await setProfile(profileToUpload);
      await setHasPlot(selectedPlot!); // Update has_plot
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  const disableNext = () => {
    if (step === 1) return !selectedState;
    if (step === 2) return !selectedUserType;
    if (step === 3) return !(typeof selectedPlot === 'undefined');
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
        <UserTypeSelection
          selectedUserType={selectedUserType}
          setSelectedUserType={setSelectedUserType}
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
          <button onClick={handleNext} disabled={disableNext()}>
            Next
          </button>
        )}
        {step === 3 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
}
