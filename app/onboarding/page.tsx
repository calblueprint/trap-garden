'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import supabase from '@/api/supabase/createClient';
import { Button } from '@/components/Buttons';
import CustomSelect from '@/components/CustomSelect';
import GardenSetupGuide from '@/components/GardenSetupGuide';
import Icon from '@/components/Icon';
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
import { userTypes } from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
import {
  ButtonDiv,
  ContentContainer,
  InputWrapper,
  OnboardingContainer,
  PDFButtonsContainer,
  PdfContainer,
  PDFPageWrapper,
  QuestionDiv,
  StyledInput,
  StyledLabel,
} from './styles';

// Use a CDN to load the worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const getPDFUrl = (userType: UserTypeEnum) => {
  const pdfData = userTypes[userType].filename;
  return supabase.storage.from('pdfs').getPublicUrl(pdfData).data.publicUrl;
};

interface ReviewPageProps {
  userId: UUID;
  selectedState: string;
  setSelectedState: (selected: string) => void;
  selectedGardenType: UserTypeEnum;
  setSelectedGardenType: (selected: UserTypeEnum) => void;
  selectedPlot: boolean;
  setSelectedPlot: (selected: boolean) => void;
  selectedName: string;
  setSelectedName: (selected: string) => void;
  onBack: () => void;
  currStep: number;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return (
    <>
      <ProgressBar progress={progress} />
      <OnboardingContainer ref={containerRef}>
        <Flex $direction="column" $align="center" $maxH="100">
          <H3
            $color={COLORS.shrub}
            style={{
              textAlign: 'center',
              marginTop: '36px',
              marginBottom: '8px',
            }}
          >
            Learn how to setup a {userTypes[selectedGardenType].label} Garden
          </H3>

          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <PdfContainer>
              <Flex
                $direction="row"
                $gap="10px"
                $align="center"
                style={{ marginBottom: '20px' }}
              >
                <Icon type="pdf" />
                <P3>
                  {userTypes[selectedGardenType].label} Garden How-to guide
                </P3>
              </Flex>
              <PDFPageWrapper>
                <Page
                  pageNumber={currentPage}
                  width={containerWidth}
                  renderTextLayer={true}
                />
                <PDFButtonsContainer>
                  <button
                    onClick={() => {
                      if (currentPage > 1)
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                    }}
                    style={{
                      all: 'unset',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: currentPage > 1 ? 'pointer' : 'default',
                    }}
                  >
                    <Icon type="forwardCarrot" />
                  </button>
                  <P3>
                    {' '}
                    {currentPage} of {numPages}
                  </P3>
                  <button
                    onClick={() => {
                      if (currentPage < (numPages || 1))
                        setCurrentPage(prev =>
                          Math.min(prev + 1, numPages || 1),
                        );
                    }}
                    style={{
                      all: 'unset',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: currentPage > 1 ? 'pointer' : 'default',
                    }}
                  >
                    <Icon type="backCarrot" />
                  </button>
                </PDFButtonsContainer>
              </PDFPageWrapper>
            </PdfContainer>
          </Document>
        </Flex>
      </OnboardingContainer>
      <ButtonDiv
        style={{ position: 'relative', gap: '30px', justifyContent: 'center' }}
      >
        <Button onClick={onBack} $secondaryColor={COLORS.shrub}>
          Back
        </Button>
        <Button onClick={onNext} $primaryColor={COLORS.shrub}>
          Next
        </Button>
      </ButtonDiv>
    </>
  );
}
function SelectionScreen<T = string>({
  progress,
  questionTitle,
  textInput,
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
  textInput: boolean | false;
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
            QUESTION {questionNumber} OF 4
          </P3>
          <QuestionDiv>
            <H3 $color={COLORS.shrub}>{questionTitle}</H3>
          </QuestionDiv>
          {textInput ? (
            <InputWrapper style={{ width: '100%' }}>
              <StyledInput
                value={(selectedValue as string) ?? ''}
                onChange={e => setSelectedValue(e.target.value as T)}
                style={{ color: COLORS.shrub }}
              />
              <StyledLabel
                style={{ justifySelf: 'left', color: COLORS.midgray }}
              >
                This will be your display name
              </StyledLabel>
            </InputWrapper>
          ) : (
            <RadioGroup
              name={`Onboarding-${questionNumber}-RadioGroup`}
              options={options}
              onChange={setSelectedValue}
              defaultValue={selectedValue}
            />
          )}
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
  selectedName,
  setSelectedName,
  selectedPlot,
  setSelectedPlot,
  onBack,
  currStep,
}: ReviewPageProps) => {
  const { setProfile } = useProfile();
  const { updateUser } = useAuth();
  const router = useRouter();

  // assumes userId is not null, since the not-logged in case
  // would have been handled by rerouting from the page
  const handleSubmit = useCallback(async () => {
    const profile: Profile = {
      user_id: userId,
      us_state: selectedState,
      user_type: selectedGardenType,
      has_plot: selectedPlot,
    };

    try {
      await updateUser(selectedName);
      await setProfile(profile);
      router.push(CONFIG.viewPlants);
    } catch (error) {
      console.error('Error upserting profile:', error);
    }
  }, [
    router,
    selectedGardenType,
    selectedPlot,
    selectedState,
    setProfile,
    selectedName,
    updateUser,
    userId,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === 'Enter' && currStep === 4) {
        handleSubmit();
      }
    };

    //add listener for keydown events
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currStep, handleSubmit]);

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
            <InputWrapper style={{ width: '100%' }}>
              <StyledLabel
                style={{ justifySelf: 'left', color: COLORS.darkgray }}
              >
                Display Name
              </StyledLabel>
              <StyledInput
                type="text"
                value={selectedName}
                onChange={e => setSelectedName(e.target.value)}
                placeholder={selectedName}
                style={{ color: COLORS.midgray }}
              />
            </InputWrapper>
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
  const [selectedName, setSelectedName] = useState<string | undefined>(
    undefined,
  );
  const { push } = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });
  useEffect(() => {
    // Only push once
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?',
      );

      if (confirmLeave) {
        // Unbind listener and go back
        window.removeEventListener('popstate', handlePopState);
        window.history.back();
        window.history.back(); // will leave the page
      } else {
        // Re-push to reset state, keep user on the page
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  });

  // If user not logged in, re-route to /login
  useEffect(() => {
    if (!authLoading && !userId) push(`${CONFIG.login}`);
  }, [authLoading, userId, push]);

  // If user already onboarded, re-route to /view-plants
  useEffect(() => {
    if (profileReady && profileData) push(`${CONFIG.viewPlants}`);
  }, [profileReady, profileData, push]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    return;
  };

  return authLoading ? (
    // TODO: implement an actual loading screen (spinner?)
    <>Loading</>
  ) : (
    <>
      {step === 1 && (
        <SelectionScreen
          progress={20}
          questionNumber={1}
          questionTitle="What state are you in?"
          textInput={false}
          options={usStateOptions}
          selectedValue={selectedState}
          setSelectedValue={setSelectedState}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <SelectionScreen<UserTypeEnum>
          progress={40}
          questionNumber={2}
          questionTitle="What type of garden are you starting?"
          textInput={false}
          options={gardenTypeOptions}
          selectedValue={selectedGardenType}
          setSelectedValue={setSelectedGardenType}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {step === 3 && (
        <SelectionScreen<string>
          progress={60}
          questionNumber={3}
          questionTitle={
            selectedGardenType
              ? userTypes[selectedGardenType].question
              : 'What is your name?'
          }
          textInput={true}
          options={[]}
          selectedValue={selectedName}
          setSelectedValue={value => {
            setSelectedName(value);
          }}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {step === 4 && (
        <SelectionScreen<boolean>
          progress={80}
          questionNumber={4}
          questionTitle="Do you already have a plot?"
          textInput={false}
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
      {step === 5 && (
        <PdfScreen
          progress={80}
          onBack={handleBack}
          onNext={handleNext}
          selectedGardenType={selectedGardenType!}
        />
      )}
      {step === 6 && (
        <ReviewPage
          userId={userId!}
          selectedState={selectedState!}
          setSelectedState={setSelectedState}
          selectedGardenType={selectedGardenType!}
          setSelectedGardenType={setSelectedGardenType}
          selectedName={selectedName!}
          setSelectedName={setSelectedName}
          selectedPlot={selectedPlot!}
          setSelectedPlot={setSelectedPlot}
          onBack={handleBack}
          currStep={step}
        />
      )}
    </>
  );
}
