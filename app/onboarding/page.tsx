'use client';

import React, { useState } from 'react';
import { upsertProfile } from '@/api/supabase/queries/profiles';
import BigButton from '@/components/BigButton';
import LabeledCustomSelect from '@/components/EditableInput';
import COLORS from '@/styles/colors';
import { DropdownOption, Profile } from '@/types/schema';
import { H3, PageContainer, ReviewContainer } from './styles';

// Define the possible options for each question
const states = [
  { label: 'Tennesse', value: 'TENNESSE' },
  { label: 'Missouri', value: 'MISSOURI' },
];
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
interface ReviewPageProps {
  selectedState: string;
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
  selectedGardenType: string;
  setSelectedGardenType: React.Dispatch<React.SetStateAction<string>>;
  selectedPlot: boolean;
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
          <option key={state.label} value={state.value}>
            {state.label}
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
const stateOptions: DropdownOption<string>[] = [
  { label: 'Tennessee', value: 'TENNESSE' },
  { label: 'Missouri', value: 'MISSOURI' },
];

const gardenTypeOptions: DropdownOption<string>[] = [
  { label: 'Individual', value: 'Individual' },
  { label: 'Community', value: 'Community' },
  { label: 'School', value: 'School' },
];

const plot: DropdownOption<boolean>[] = [
  { label: 'Yes, I own a plot', value: true },
  { label: "No, I don't own a plot", value: false },
];

// Updated ReviewPage component to accept necessary props

const ReviewPage = ({
  selectedState,
  setSelectedState,
  selectedGardenType,
  setSelectedGardenType,
  selectedPlot,
  setSelectedPlot,
}: ReviewPageProps) => {
  const handleSubmit = async () => {
    const profile: Profile = {
      user_id: '2abd7296-374a-42d1-bb4f-b813da1615ae',
      us_state: selectedState,
      user_type: selectedGardenType,
      // has_plot: selectedPlot,
    };

    try {
      await upsertProfile(profile);
      console.log('Profile submitted successfully:', profile);
    } catch (error) {
      console.error('Error upserting profile:', error);
    }
  };

  return (
    <PageContainer>
      <ReviewContainer>
        <H3 style={{ textAlign: 'center' }}>Review Your Response</H3>
        <LabeledCustomSelect
          label="State Location"
          value={selectedState}
          options={stateOptions}
          onChange={setSelectedState}
        />

        <LabeledCustomSelect
          label="Garden Type"
          value={selectedGardenType}
          options={gardenTypeOptions}
          onChange={setSelectedGardenType} // Directly pass the selected value
        />
        <LabeledCustomSelect
          label="Plot Status"
          value={selectedPlot}
          options={plot}
          onChange={value => setSelectedPlot(value === true)} // Convert the value as needed
        />
        <div style={{ height: '12.625rem' }} />
        <BigButton color={COLORS.shrub} onClick={handleSubmit}>
          Let&apos;s Start Growing !
        </BigButton>
      </ReviewContainer>
    </PageContainer>
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
      {step === 4 && (
        <ReviewPage
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedGardenType={selectedGardenType}
          setSelectedGardenType={setSelectedGardenType}
          selectedPlot={selectedPlot}
          setSelectedPlot={setSelectedPlot}
        />
      )}

      <div>
        {step > 1 && <button onClick={handleBack}>Back</button>}
        {step < 4 && (
          <button onClick={handleNext} disabled={!selectedState && step === 1}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
