'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { BigButton } from '@/components/Buttons';
import LabeledCustomSelect from '@/components/EditableInput';
import COLORS from '@/styles/colors';
import { DropdownOption, Profile, UserTypeEnum } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';
import { H3, PageContainer, ReviewContainer } from './styles';

// Define the possible options for each question
const stateOptions: DropdownOption<string>[] = [
  { label: 'Tennessee', value: 'TENNESSEE' },
  { label: 'Missouri', value: 'MISSOURI' },
];

const gardenTypeOptions: DropdownOption<UserTypeEnum>[] = [
  { label: 'Individual', value: 'INDIV' },
  { label: 'Community', value: 'ORG' },
  { label: 'School', value: 'SCHOOL' },
];

const plotOptions: DropdownOption<boolean>[] = [
  { label: 'Yes, I own a plot', value: true },
  { label: "No, I don't own a plot", value: false },
];

interface StateSelectionProps {
  selectedState: string | undefined; // undefined b/c <select> only accepts undefined
  setSelectedState: (selected: string) => void;
}

interface GardenTypeSelectionProps {
  selectedGardenType: UserTypeEnum | undefined;
  setSelectedGardenType: (selected: UserTypeEnum) => void;
}

interface PlotSelectionProps {
  selectedPlot: boolean | undefined;
  setSelectedPlot: (selected: boolean) => void;
}
interface ReviewPageProps {
  selectedState: string;
  setSelectedState: (selected: string) => void;
  selectedGardenType: UserTypeEnum;
  setSelectedGardenType: (selected: UserTypeEnum) => void;
  selectedPlot: boolean;
  setSelectedPlot: (selected: boolean) => void;
}

// Step 1: Select State
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
        {stateOptions.map(state => (
          <option key={state.label} value={state.value}>
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
      {gardenTypeOptions.map(type => (
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

const ReviewPage = ({
  selectedState,
  setSelectedState,
  selectedGardenType,
  setSelectedGardenType,
  selectedPlot,
  setSelectedPlot,
}: ReviewPageProps) => {
  const { userId } = useAuth();
  const { setProfile, setHasPlot } = useProfile();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!userId) {
      console.error('User ID is not available. Please log in.');
      return;
    }
    const profile: Profile = {
      user_id: userId as UUID,
      us_state: selectedState,
      user_type: selectedGardenType,
    };

    try {
      await setProfile(profile);
      console.log('Profile submitted successfully:', profile);
      setHasPlot(selectedPlot);
      router.push('/view-plants');
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
          options={plotOptions}
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
export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedGardenType, setSelectedGardenType] = useState<
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
          selectedGardenType={selectedGardenType!}
          setSelectedGardenType={setSelectedGardenType}
          selectedPlot={selectedPlot!}
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
}
