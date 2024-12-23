'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { insertUserPlants } from '@/api/supabase/queries/userPlants';
import PlantDetails from '@/components/PlantDetails';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H1, H4, P1, P2 } from '@/styles/text';
import { PlantingTypeEnum, UserPlant } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { plantingTypeLabels } from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
import {
  ButtonDiv,
  FooterButton,
  MoveButton,
  ReviewDetailsContainer,
  ReviewHeader,
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
      <Flex>
        <Flex $direction="column">
          <P2 $fontWeight={500}>Date Planted</P2>
          <P2>{dateAdded}</P2>
        </Flex>
        <Flex $direction="column">
          <P2 $fontWeight={500}>Planting Type</P2>
          <P2>{plantingTypeLabels[plantingType]}</P2>
        </Flex>
      </Flex>
      {/* <CustomSelect
        label="Planting Type"
        value={detail.planting_type}
        options={plantingTypeOptions}
        onChange={value => updateInput('planting_type', value, index)}
      />
      <DateInput
        value={detail.date_added}
        onChange={value => updateInput('date_added', value, index)}
      /> */}
    </Flex>
  );
}

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
            <ReviewHeader>Review & Submit</ReviewHeader>
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
          </Flex>
        </Flex>
      )}
    </>
  );
}
