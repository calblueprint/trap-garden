'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertUserPlants } from '@/api/supabase/queries/userPlants';
import NavigationBar from '@/components/NavigationBar';
import PlantDetails from '@/components/PlantDetails';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H1 } from '@/styles/text';
import { UserPlant } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';
import { FooterButton, MoveButton } from './styles';

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

  const getDefaultDate = () => new Date().toISOString().substring(0, 10);

  // Navigate between plants and save input data
  function move(steps: number) {
    const currentDetail = details[currentIndex - 1];

    // Set curr date in details to default date if not on submission page
    if (
      (!currentDetail || !currentDetail.date_added) &&
      currentIndex <= plantsToAdd.length
    ) {
      updateInput('date_added', getDefaultDate());
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

  function disableNext() {
    // disable next if planting type is "SELECT" or undefined
    return !(
      details[currentIndex - 1].planting_type
      // requires refactor of details to ensure that planting_type is PlantingTypeEnum
      // && details[currentIndex - 1].planting_type !== 'SELECT'
    );
  }

  function updateInput(field: string, value: string) {
    const updatedDetails = [...details];
    updatedDetails[currentIndex - 1] = {
      ...updatedDetails[currentIndex - 1],
      [field]: value,
    };
    setDetails(updatedDetails);
  }
  // const handleSubmit = async () => {
  //   try {
  //     await insertUserPlants(userId!, details);
  //     router.push('/view-plants');
  //   } catch (error) {
  //     console.error('Error inserting user plants:', error);
  //     // Optionally, add user-facing error handling
  //   }
  // };
  async function updateDB() {
    await insertUserPlants(userId!, details);
    router.push('/view-plants');
  }
  const handlePlantSelection = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {currentIndex !== plantsToAdd.length + 1 && (
        <Flex $direction="column" $justify="between">
          <Flex $direction="column" $justify="start">
            <Flex $gap="16px" $direction="column" $textAlign="center">
              <H1 $color={COLORS.shrub}>Add Plant Details</H1>
              {/* <P1 $color={COLORS.midgray}>
                {currentIndex} / {plantsToAdd.length}
              </P1> */}
              <NavigationBar
                currentIndex={currentIndex}
                totalCount={plantsToAdd.length}
                plantsToAdd={plantsToAdd}
                onPrev={() => move(-1)}
                onNext={() => move(1)}
                onSelectPlant={handlePlantSelection}
              />
            </Flex>
            <PlantDetails
              plant={plantsToAdd[currentIndex - 1]}
              date={details[currentIndex - 1].date_added || getDefaultDate()}
              plantingType={details[currentIndex - 1].planting_type || 'SELECT'}
              onDateChange={date => updateInput('date_added', date)}
              onPlantingTypeChange={type => updateInput('planting_type', type)}
            />
          </Flex>
          <Flex>
            <FooterButton>
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
                disabled={disableNext()}
                onClick={() => move(1)}
                $primaryColor={disableNext() ? COLORS.midgray : COLORS.shrub}
                $secondaryColor="white"
              >
                Next
              </MoveButton>
            </FooterButton>
          </Flex>
        </Flex>
      )}
      {currentIndex === plantsToAdd.length + 1 && (
        <div>
          <button type="button" onClick={() => move(-1)}>
            Back
          </button>
          <button type="button" onClick={updateDB}>
            Submit
          </button>
        </div>
      )}
    </>
  );
}
