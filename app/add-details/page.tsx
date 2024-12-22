'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { insertUserPlants } from '@/api/supabase/queries/userPlants';
import PlantDetails from '@/components/PlantDetails';
import ReviewAddDetails from '@/components/ReviewAddDetails';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H1, P1 } from '@/styles/text';
import { UserPlant } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';
import {
  ButtonDiv,
  FooterButton,
  MoveButton,
  PageContainer,
  ReviewHeader,
} from './styles';

export default function Home() {
  const { profileData, profileReady, plantsToAdd } = useProfile();
  const { userId } = useAuth();
  const router = useRouter();

  if (profileReady && !profileData) {
    router.push('/view-plants');
  }
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [details, setDetails] = useState<Record<string, Partial<UserPlant>>>(
    plantsToAdd.reduce(
      (acc, plant) => ({
        ...acc,
        [plant.id]: { plant_id: plant.id, user_id: userId! },
      }),
      {},
    ),
  );

  const plantDictionary: Record<UUID, string> = {};
  for (const plant of plantsToAdd) {
    plantDictionary[plant.id] = plant.plant_name;
  }

  const getDefaultDate = () => new Date().toISOString().substring(0, 10);

  // Navigate between plants and save input data
  function move(steps: number) {
    // Set curr date in details to default date if not on submission page

    if (currentIndex <= plantsToAdd.length) {
      const currentDetail = details[plantsToAdd[currentIndex - 1].id];
      if (!currentDetail || !currentDetail.date_added) {
        updateInput(
          'date_added',
          getDefaultDate(),
          plantsToAdd[currentIndex - 1].id,
        );
      }
    }

    // For valid moves, move to next page
    if (
      steps !== 0 &&
      currentIndex + steps > 0 &&
      currentIndex + steps <= plantsToAdd.length + 1
    ) {
      setCurrentIndex(prevIndex => prevIndex + steps);
    }
  }

  // disable next if planting type not selected (undefined)
  const disableNext =
    currentIndex <= plantsToAdd.length &&
    !details[plantsToAdd[currentIndex - 1].id].planting_type;

  function updateInput(field: string, value: string, plant_id: UUID) {
    setDetails(prevDetails => ({
      ...prevDetails,
      [plant_id]: {
        ...prevDetails[plant_id],
        [field]: value,
      },
    }));
  }
  const handleSubmit = async () => {
    // TODO: elegantly handle not logged in case (e.g. when someonee clicks "Back")
    // instead of doing userId!
    try {
      await insertUserPlants(userId!, Object.values(details));
      router.push('/view-plants');
    } catch (error) {
      console.error('Error inserting user plants:', error);
    }
  };

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
              date={
                details[plantsToAdd[currentIndex - 1].id].date_added ??
                getDefaultDate()
              }
              plantingType={
                details[plantsToAdd[currentIndex - 1].id].planting_type ?? ''
              }
              onDateChange={date =>
                updateInput(
                  'date_added',
                  date,
                  plantsToAdd[currentIndex - 1].id,
                )
              }
              onPlantingTypeChange={type =>
                updateInput(
                  'planting_type',
                  type,
                  plantsToAdd[currentIndex - 1].id,
                )
              }
            />
          </Flex>
          <FooterButton>
            <ButtonDiv>
              {currentIndex > 1 && (
                <MoveButton
                  type="button"
                  onClick={() => move(-1)}
                  $secondaryColor={COLORS.shrub}
                >
                  Back
                </MoveButton>
              )}

              <MoveButton
                type="button"
                disabled={disableNext}
                onClick={() => move(1)}
                $primaryColor={disableNext ? COLORS.midgray : COLORS.shrub}
                $secondaryColor="white"
              >
                Next
              </MoveButton>
            </ButtonDiv>
          </FooterButton>
        </Flex>
      )}
      {currentIndex === plantsToAdd.length + 1 && (
        <PageContainer>
          <ReviewHeader>Review & Submit</ReviewHeader>

          <ReviewAddDetails
            details={details}
            updateInput={updateInput}
            plantDictionary={plantDictionary}
          ></ReviewAddDetails>
          <Flex $direction="row" $justify="between" $w="500px" $mt="24px">
            <MoveButton
              type="button"
              onClick={() => move(-1)}
              $secondaryColor={COLORS.shrub}
            >
              Back
            </MoveButton>
            <MoveButton
              type="button"
              onClick={handleSubmit}
              $primaryColor={disableNext ? COLORS.midgray : COLORS.shrub}
              $secondaryColor="white"
            >
              Submit
            </MoveButton>
          </Flex>
        </PageContainer>
      )}
    </>
  );
}
