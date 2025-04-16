'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertUserPlants } from '@/api/supabase/queries/userPlants';
import { Button } from '@/components/Buttons';
import PlantDetails from '@/components/PlantDetails';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H1, H3, H4, P1, P2 } from '@/styles/text';
import { PlantingTypeEnum, UserPlant } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { plantingTypeLabels } from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
import {
  ButtonDiv,
  FooterButton,
  ReviewDetailsContainer,
  ReviewGrid,
} from './styles';

function ReviewPlant({
  plantName,
  dateAdded,
  plantingType,
}: {
  plantName: string;
  dateAdded: string;
  plantingType: PlantingTypeEnum;
}) {
  return (
    <Flex $direction="column" $gap="8px" $mb="16px">
      <H4 $fontWeight={500} $color={COLORS.shrub}>
        {plantName}
      </H4>
      <ReviewGrid>
        <P2 $fontWeight={500}>Date Planted</P2>
        <P2>{dateAdded}</P2>
        <P2 $fontWeight={500}>Planting Type</P2>
        <P2>{plantingTypeLabels[plantingType]}</P2>
      </ReviewGrid>
    </Flex>
  );
}

export default function Home() {
  const { profileData, profileReady, plantsToAdd } = useProfile();
  const { userId } = useAuth();
  const router = useRouter();
  // TODO: address error: if you try to signout from this page
  // it directs to /view-plants instead of login
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);

    const handlePopState = () => {
      window.confirm(
        'You have unsaved changes. Are you sure you want to leave?',
      );
    };

    //activated when user moves between browser history (as in, moves back a page for example)
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  });

  useEffect(() => {
    if (profileReady && !profileData) {
      router.push(CONFIG.viewPlants);
    }
  }, [profileData, profileReady, router]);

  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [details, setDetails] = useState<Partial<UserPlant>[]>(
    plantsToAdd.map(plant => ({ plant_id: plant.id })),
  );

  const getDefaultDate = () => new Date().toISOString().substring(0, 10);

  function move(steps: number) {
    if (currentIndex <= plantsToAdd.length) {
      const currentDetail = details[currentIndex - 1];
      if (!currentDetail || !currentDetail.date_added) {
        updateInput('date_added', getDefaultDate(), currentIndex - 1);
      }
    }

    if (
      steps !== 0 &&
      currentIndex + steps > 0 &&
      currentIndex + steps <= plantsToAdd.length + 1
    ) {
      setCurrentIndex(prevIndex => prevIndex + steps);
    }
  }

  const disableNext =
    currentIndex <= plantsToAdd.length &&
    !details[currentIndex - 1].planting_type;

  function updateInput(field: string, value: string, index: number) {
    const updatedDetails = [...details];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
      water_frequency: plantsToAdd[index].water_frequency,
      weeding_frequency: plantsToAdd[index].weeding_frequency,
      plant_name: plantsToAdd[index].plant_name,
    };
    setDetails(updatedDetails);
  }

  const handleSubmit = useCallback(async () => {
    // TODO: elegantly handle not logged in case (e.g. when someonee clicks "Back")
    // instead of doing userId!
    if (!userId) return;
    try {
      const completedDetails: Omit<
        UserPlant,
        'id' | 'date_removed' | 'recent_harvest' | 'num_harvested' | 'due_date'
      >[] = details.map(detail => ({
        user_id: userId,
        plant_id: detail.plant_id!,
        date_added: detail.date_added!,
        planting_type: detail.planting_type!,
        water_frequency: detail.water_frequency!,
        weeding_frequency: detail.weeding_frequency!,
        last_watered: getDefaultDate(),
        last_weeded: getDefaultDate(),
        plant_name: detail.plant_name!,
        date_added_to_db: getDefaultDate(),
        previous_last_watered: getDefaultDate(),
        previous_last_weeded: getDefaultDate(),
      }));
      await insertUserPlants(completedDetails);
      router.push('/view-plants');
    } catch (error) {
      console.error('Error inserting user plants:', error);
    }
  }, [details, router, userId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === 'Enter') {
        handleSubmit();
      }
    };

    //add listener for keydown events
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <>
      {currentIndex !== plantsToAdd.length + 1 && (
        <Flex $direction="column" $justify="between">
          <Flex $direction="column" $justify="start">
            <Flex $gap="16px" $direction="column" $textAlign="center">
              <H1 $color={COLORS.shrub}>Add Plant Details</H1>
              <P1 $color={COLORS.midgray}>
                {currentIndex} / {plantsToAdd.length}
              </P1>
            </Flex>
            <PlantDetails
              plant={plantsToAdd[currentIndex - 1]}
              date={details[currentIndex - 1].date_added ?? getDefaultDate()}
              plantingType={details[currentIndex - 1].planting_type ?? ''}
              onDateChange={date =>
                updateInput('date_added', date, currentIndex - 1)
              }
              onPlantingTypeChange={type =>
                updateInput('planting_type', type, currentIndex - 1)
              }
            />
          </Flex>
          <FooterButton>
            <ButtonDiv>
              {currentIndex > 1 && (
                <Button onClick={() => move(-1)} $secondaryColor={COLORS.shrub}>
                  Back
                </Button>
              )}
              <Button
                onClick={() => move(1)}
                disabled={disableNext}
                $primaryColor={COLORS.shrub}
                $secondaryColor="white"
              >
                Next
              </Button>
            </ButtonDiv>
          </FooterButton>
        </Flex>
      )}
      {currentIndex === plantsToAdd.length + 1 && (
        <Flex
          $minH="full-screen"
          $direction="column"
          $align="center"
          $justify="center"
        >
          <Flex
            $direction="column"
            $maxW="500px"
            $align="center"
            $h="max-content"
            $p="24px"
          >
            <H3 $color={COLORS.shrub} style={{ marginBottom: '40px' }}>
              Review & Submit
            </H3>
            <ReviewDetailsContainer>
              {details.map((detail, index) => (
                <ReviewPlant
                  key={plantsToAdd[index].id}
                  plantName={plantsToAdd[index].plant_name}
                  plantingType={detail.planting_type!}
                  dateAdded={detail.date_added!}
                />
              ))}
            </ReviewDetailsContainer>
            <Flex $direction="row" $justify="between" $maxW="500px" $mt="24px">
              <Button onClick={() => move(-1)} $secondaryColor={COLORS.shrub}>
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={disableNext}
                $primaryColor={COLORS.shrub}
                $secondaryColor="white"
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
