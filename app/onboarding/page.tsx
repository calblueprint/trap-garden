'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { Button } from '@/components/Buttons';
import CustomSelect from '@/components/CustomSelect';
import ProgressBar from '@/components/ProgressBar';
import RadioGroup from '@/components/RadioGroup';
import CONFIG from '@/lib/configs';
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

function SelectionScreen<T = string>({
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
  selectedValue: T | undefined;
  setSelectedValue: (selected: T) => void;
  options: DropdownOption<T>[];
  onBack?: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <ProgressBar progress={progress} />
      <OnboardingContainer>
        <Flex $direction="column" $align="center">
          <P3
            $color={COLORS.shrub}
            style={{
              textAlign: 'center',
              marginTop: '36px',
              marginBottom: '8px',
            }}
          >
            QUESTION {questionNumber} OF 3
          </P3>
          <QuestionDiv>
            <H3 $color={COLORS.shrub}>{questionTitle}</H3>
          </QuestionDiv>
          <RadioGroup
            name={`Onboarding-${questionNumber}-RadioGroup`}
            options={options}
            onChange={setSelectedValue}
            defaultValue={selectedValue}
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
            disabled={selectedValue === undefined}
            $primaryColor={COLORS.shrub}
          >
            Next
          </Button>
        </ButtonDiv>
      </OnboardingContainer>
    </>
  );
}

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
      router.push(CONFIG.viewPlants);
    } catch (error) {
      console.error('Error upserting profile:', error);
    }
  };

  return (
    <>
      <ProgressBar progress={100} />
      <OnboardingContainer>
        <div
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
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
    </>
  );
};

// Main Onboarding Component
export default function OnboardingFlow() {
  const { userId, loading: authLoading } = useAuth();
  const { profileReady, profileData } = useProfile();
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined,
  );
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

  return authLoading ? (
    // TODO: implement an actual loading screen (spinner?)
    <>Loading</>
  ) : (
    <>
      {step === 1 && (
        <SelectionScreen
          progress={2.6}
          questionNumber={1}
          questionTitle="What state are you in?"
          options={usStateOptions}
          selectedValue={selectedState}
          setSelectedValue={setSelectedState}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <SelectionScreen<UserTypeEnum>
          progress={33}
          questionNumber={2}
          questionTitle="What type of garden are you starting?"
          options={gardenTypeOptions}
          selectedValue={selectedGardenType}
          setSelectedValue={setSelectedGardenType}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {step === 3 && (
        <SelectionScreen<boolean>
          progress={66}
          questionNumber={3}
          questionTitle="Do you already have a plot?"
          options={plotOptions}
          selectedValue={selectedPlot}
          setSelectedValue={setSelectedPlot}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {step === 4 && (
        <ReviewPage
          userId={userId!}
          selectedState={selectedState!}
          setSelectedState={setSelectedState}
          selectedGardenType={selectedGardenType!}
          setSelectedGardenType={setSelectedGardenType}
          selectedPlot={selectedPlot!}
          setSelectedPlot={setSelectedPlot}
          onBack={handleBack}
        />
      )}
    </>
  );
}
