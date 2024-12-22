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
  const [details, setDetails] = useState<Partial<UserPlant>[]>(
    plantsToAdd.map(plant => ({ plant_id: plant.id, user_id: userId! })),
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
      const currentDetail = details[currentIndex - 1];
      if (!currentDetail || !currentDetail.date_added) {
        updateInput('date_added', getDefaultDate(), currentIndex - 1);
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
    !details[currentIndex - 1].planting_type;

  function updateInput(field: string, value: string, index: number) {
    const updatedDetails = [...details];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    };
    setDetails(updatedDetails);
  }
  const handleSubmit = async () => {
    // TODO: elegantly handle not logged in case (e.g. when someonee clicks "Back")
    // instead of doing userId!
    try {
      await insertUserPlants(userId!, details);
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
