'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { Button } from '@/components/Buttons';
import CustomSelect from '@/components/CustomSelect';
import ProgressBar from '@/components/ProgressBar';
import RadioGroup from '@/components/RadioGroup';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H3, P1, P3 } from '@/styles/text';
import { DropdownOption, Profile, UserTypeEnum } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { gardenTypeOptions, usStateOptions } from '@/utils/dropdownOptions';
import { useProfile } from '@/utils/ProfileProvider';
import {
  ButtonDiv,
  ContentContainer,
  OnboardingContainer,
  QuestionDiv,
} from './styles';

// Define the possible options for each question
// usStateOptions, gardenTypeOptions imported from elsewhere
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
  userId: UUID;
  selectedState: string;
  setSelectedState: (selected: string) => void;
  selectedGardenType: UserTypeEnum;
  setSelectedGardenType: (selected: UserTypeEnum) => void;
  selectedPlot: boolean;
  setSelectedPlot: (selected: boolean) => void;
  onBack: () => void;
}

function SelectionScreen<T>({
  progress,
  questionTitle,
  questionNumber,
  selectedValue,
  setSelectedValue,
  options,
  onBack,
  onNext,
}: {
  progress: number;
  questionTitle: string;
  questionNumber: number;
  selectedValue: T;
  setSelectedValue: (selected: T) => void;
  options: DropdownOption<T>[];
  onBack?: () => void;
  onNext: () => void;
}) {
  return (
    <OnboardingContainer>
      <Flex $direction="column" $align="center">
        <ProgressBar progress={progress} />
        <P3
          $color={COLORS.shrub}
          style={{ marginTop: '36px', marginBottom: '8px' }}
        >
          QUESTION {questionNumber} OF 3
        </P3>
        <QuestionDiv>
          <H3 $color={COLORS.shrub}>{questionTitle}</H3>
        </QuestionDiv>
        <RadioGroup
          name="StateRadioGroup"
          options={options}
          onChange={setSelectedValue}
        />
      </Flex>
      <ButtonDiv>
        <Button
          onClick={onBack}
          $primaryColor="white"
          $secondaryColor={COLORS.shrub}
          $textColor={COLORS.shrub}
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedValue}
          $primaryColor={COLORS.shrub}
        >
          Next
        </Button>
      </ButtonDiv>
    </OnboardingContainer>
  );
}

// Step 1: Select State
const StateSelection = ({
  selectedState,
  setSelectedState,
  onNext,
}: StateSelectionProps & { onNext: () => void }) => {
  return (
    <OnboardingContainer>
      <Flex $direction="column" $align="center">
        <ProgressBar progress={2.6} />
        <P3 $color={COLORS.shrub} style={{ marginTop: '2.5rem' }}>
          QUESTION 1 OF 3
        </P3>
        <QuestionDiv>
          <H3 $color={COLORS.shrub}>What state are you in?</H3>
        </QuestionDiv>
        <RadioGroup
          name="StateRadioGroup"
          options={usStateOptions}
          onChange={setSelectedState}
        />
      </Flex>
      <ButtonDiv>
        <Button
          onClick={onNext}
          disabled={!selectedState}
          $primaryColor={COLORS.shrub}
        >
          Next
        </Button>
      </ButtonDiv>
    </OnboardingContainer>
  );
};

// Step 2: Select garden type
const GardenTypeSelection = ({
  selectedGardenType,
  setSelectedGardenType,
  onNext,
  onBack,
}: GardenTypeSelectionProps & { onNext: () => void } & {
  onBack: () => void;
}) => {
  return (
    <OnboardingContainer>
      <Flex $direction="column" $align="center">
        <ProgressBar progress={33} />
        <P3 $color={COLORS.shrub} style={{ marginTop: '2.5rem' }}>
          QUESTION 2 OF 3
        </P3>
        <QuestionDiv>
          <H3 $color={COLORS.shrub} style={{ textAlign: 'center' }}>
            What type of garden are you starting?
          </H3>
        </QuestionDiv>
        <RadioGroup
          name="GardenTypeRadioGroup"
          options={gardenTypeOptions}
          onChange={setSelectedGardenType}
        />
      </Flex>
      <ButtonDiv>
        <Button
          onClick={onBack}
          $primaryColor="white"
          $secondaryColor={COLORS.shrub}
          $textColor={COLORS.shrub}
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedGardenType}
          $primaryColor={COLORS.shrub}
        >
          Next
        </Button>
      </ButtonDiv>
    </OnboardingContainer>
  );
};

// Step 3: Do you have a plot?
const PlotSelection = ({
  selectedPlot,
  setSelectedPlot,
  onNext,
  onBack,
}: PlotSelectionProps & { onNext: () => void } & {
  onBack: () => void;
}) => {
  return (
    <OnboardingContainer>
      <Flex $direction="column" $align="center">
        <ProgressBar progress={66} />
        <P3 $color={COLORS.shrub} style={{ marginTop: '2.5rem' }}>
          QUESTION 3 OF 3
        </P3>
        <QuestionDiv>
          <H3 $color={COLORS.shrub} style={{ textAlign: 'center' }}>
            Do you already have a plot?
          </H3>
        </QuestionDiv>
        <RadioGroup
          name="PlotSelectionRadioGroup"
          options={plotOptions}
          onChange={setSelectedPlot}
        />
      </Flex>
      <ButtonDiv>
        <Button
          onClick={onBack}
          $primaryColor="white"
          $secondaryColor={COLORS.shrub}
          $textColor={COLORS.shrub}
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={selectedPlot === undefined}
          $primaryColor={COLORS.shrub}
        >
          Next
        </Button>
      </ButtonDiv>
    </OnboardingContainer>
  );
};

// TODO: Maybe just directly include this inside OnboardingFlow
// to mitigate needing to redefine router.
const ReviewPage = ({
  userId,
  selectedState,
  setSelectedState,
  selectedGardenType,
  setSelectedGardenType,
  selectedPlot,
  setSelectedPlot,
  onBack,
}: ReviewPageProps) => {
  const { setProfile } = useProfile();
  const router = useRouter();

  // assumes userId is not null, since the not-logged in case
  // would have been handled by rerouting from the page
  const handleSubmit = async () => {
    const profile: Profile = {
      user_id: userId,
      us_state: selectedState,
      user_type: selectedGardenType,
      has_plot: selectedPlot,
    };

    try {
      await setProfile(profile);
      // console.log('Profile submitted successfully:', profile);
      router.push('/view-plants');
    } catch (error) {
      console.error('Error upserting profile:', error);
    }
  };

  return (
    <OnboardingContainer>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <ProgressBar progress={100} />
        <H3
          $color={COLORS.shrub}
          style={{
            textAlign: 'center',
            marginTop: '90px',
            marginBottom: '40px',
          }}
        >
          Review & Submit
        </H3>
        <ContentContainer>
          <P1 style={{ color: COLORS.shrub, marginBottom: '16px' }}>
            Your Responses
          </P1>
          <Flex $direction="column" $gap="24px">
            <CustomSelect
              label="State Location"
              value={selectedState}
              options={usStateOptions}
              onChange={setSelectedState}
            />
            <CustomSelect
              label="Garden Type"
              value={selectedGardenType}
              options={gardenTypeOptions}
              onChange={setSelectedGardenType}
            />
            <CustomSelect
              label="Plot Status"
              value={selectedPlot}
              options={plotOptions}
              onChange={value => setSelectedPlot(value)}
            />
          </Flex>
        </ContentContainer>
      </div>
      <ButtonDiv>
        <Button
          onClick={onBack}
          $primaryColor="white"
          $secondaryColor={COLORS.shrub}
          $textColor={COLORS.shrub}
        >
          Back
        </Button>
        <Button onClick={handleSubmit} $primaryColor={COLORS.shrub}>
          Let&apos;s Grow!
        </Button>
      </ButtonDiv>
    </OnboardingContainer>
  );
};

// Main Onboarding Component
export default function OnboardingFlow() {
  const { userId, loading: authLoading } = useAuth();
  const { profileReady, profileData } = useProfile();
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedGardenType, setSelectedGardenType] = useState<
    UserTypeEnum | undefined
  >(undefined);
  const [selectedPlot, setSelectedPlot] = useState<boolean | undefined>(
    undefined,
  );
  const { push } = useRouter();

  // If user not logged in, re-route to /login
  useEffect(() => {
    if (!authLoading && !userId) push('/login');
  }, [authLoading, userId, push]);

  // If user already onboarded, re-route to /view-plants
  useEffect(() => {
    if (profileReady && profileData) push('/view-plants');
  }, [profileReady, profileData, push]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return !userId ? (
    // TODO: implement an actual loading screen (spinner?)
    <>Loading</>
  ) : (
    <Flex>
      {step === 1 && (
        <StateSelection
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <GardenTypeSelection
          selectedGardenType={selectedGardenType}
          setSelectedGardenType={setSelectedGardenType}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <PlotSelection
          selectedPlot={selectedPlot}
          setSelectedPlot={setSelectedPlot}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <ReviewPage
          userId={userId}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedGardenType={selectedGardenType!}
          setSelectedGardenType={setSelectedGardenType}
          selectedPlot={selectedPlot!}
          setSelectedPlot={setSelectedPlot}
          onBack={handleBack}
        />
      )}
    </Flex>
  );
}
