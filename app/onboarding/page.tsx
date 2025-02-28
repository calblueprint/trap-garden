'use client';

import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import supabase from '@/api/supabase/createClient';
import { Button } from '@/components/Buttons';
import CustomSelect from '@/components/CustomSelect';
import GardenSetupGuide from '@/components/GardenSetupGuide';
import ProgressBar from '@/components/ProgressBar';
import RadioGroup from '@/components/RadioGroup';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H3, P1, P3 } from '@/styles/text';
import { DropdownOption, Profile, UserTypeEnum } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import {
  gardenTypeOptions,
  plotOptions,
  usStateOptions,
} from '@/utils/dropdownOptions';
import { useProfile } from '@/utils/ProfileProvider';
import {
  ButtonDiv,
  ContentContainer,
  OnboardingContainer,
  QuestionDiv,
} from './styles';

// ✅ Fix: Use a CDN to load the worker(idk why this works)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const getPDFUrl = (userType: UserTypeEnum) => {
  const pdfFiles: Record<UserTypeEnum, string> = {
    ORG: 'CommunityGardenGuide.pdf',
    INDIV: 'HomeGardenGuide.pdf',
    SCHOOL: 'SchoolGardenGuide.pdf',
  };

  return supabase.storage.from('pdfs').getPublicUrl(pdfFiles[userType]).data
    .publicUrl;
};

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
function PdfScreen({
  progress,
  selectedGardenType,
  onBack,
  onNext,
}: {
  progress: number;
  selectedGardenType: UserTypeEnum;
  onBack?: () => void;
  onNext: () => void;
}) {
  const pdfUrl = getPDFUrl(selectedGardenType);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    const updateSize = () => {
      setContainerWidth(window.innerWidth * 0.2); // 90% of screen width
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return (
    <>
      <ProgressBar progress={progress} />
      <OnboardingContainer>
        <Flex $direction="column" $align="center" $maxH="100">
          <P3
            $color={COLORS.shrub}
            style={{
              textAlign: 'center',
              marginTop: '36px',
              marginBottom: '8px',
            }}
          >
            Garden Set Up Guide
          </P3>
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page
              pageNumber={currentPage}
              width={containerWidth}
              renderTextLayer={true}
            />
          </Document>
          <div
            style={{
              position: 'absolute',
              bottom: '10px', // Moves buttons up
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
              padding: '8px 16px',
              borderRadius: '8px',
            }}
          >
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <P3>
              Page {currentPage} of {numPages || '?'}
            </P3>
            <Button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, numPages || 1))
              }
              disabled={currentPage === numPages}
            >
              Next
            </Button>
          </div>
        </Flex>
        <ButtonDiv>
          {onBack && (
            <Button onClick={onBack} $secondaryColor={COLORS.shrub}>
              Back
            </Button>
          )}
          <Button onClick={onNext} $primaryColor={COLORS.shrub}>
            Next
          </Button>
        </ButtonDiv>
      </OnboardingContainer>
    </>
  );
}
function SelectionScreen<T = string>({
  progress,
  questionTitle,
  questionNumber,
  selectedValue,
  setSelectedValue,
  options,
  childComponent,
  onBack,
  onNext,
}: {
  progress: number;
  questionTitle: string;
  questionNumber: number;
  selectedValue: T | undefined;
  setSelectedValue: (selected: T) => void;
  options: DropdownOption<T>[];
  childComponent?: React.ReactNode;
  onBack?: () => void;
  onNext: () => void;
}) {
  // TODO: Maybe make total question number a prop
  // rather than hard-code as 3
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
          <Flex $pt="16px">{childComponent}</Flex>
        </Flex>
        <ButtonDiv>
          {onBack && (
            <Button onClick={onBack} $secondaryColor={COLORS.shrub}>
              Back
            </Button>
          )}
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
        <H3
          $color={COLORS.shrub}
          style={{
            textAlign: 'center',
            marginTop: '40px',
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
        <ButtonDiv>
          <Button onClick={onBack} $secondaryColor={COLORS.shrub}>
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
    if (step === 3) {
      // If user selects "No" for plot, show extra step
      if (selectedPlot === false) {
        setStep(3.5); // Go to extra step
        return;
      }
    }
    if (step === 3.5) {
      // If user selects "No" for plot, show extra step
      if (selectedPlot === false) {
        setStep(4); // Go to extra step
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step == 3.5) {
      setStep(step - 0.5);
      return;
    }
    setStep(step - 1);
  };

  return authLoading ? (
    // TODO: implement an actual loading screen (spinner?)
    <>Loading</>
  ) : (
    <>
      {step === 1 && (
        <SelectionScreen
          progress={3}
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
          // GardenSetupGuide should only appear when user selects an option for plotstatus
          childComponent={
            selectedPlot !== undefined && (
              <GardenSetupGuide userType={selectedGardenType!} />
            )
          }
        />
      )}
      {step === 3.5 && (
        <PdfScreen
          progress={66}
          onBack={handleBack}
          onNext={handleNext}
          selectedGardenType={selectedGardenType!}
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
