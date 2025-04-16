'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { insertTasks } from '@/api/supabase/queries/tasks';
import { getPlantById } from '@/api/supabase/queries/plants';
import { insertUserPlants } from '@/api/supabase/queries/userPlants';
import { Button } from '@/components/Buttons';
import ConfirmationModal from '@/components/ConfirmationModal';
import Icon from '@/components/Icon';
import PlantDetails from '@/components/PlantDetails';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H1, H3, H4, P1, P2 } from '@/styles/text';
import { PlantingTypeEnum, SingleTask, UserPlant } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { formatListWithAnd, plantingTypeLabels } from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
import {
  ButtonDiv,
  DeleteButton,
  FooterButton,
  ReviewDetailsContainer,
  ReviewGrid,
} from './styles';

const formatDate = (dateString: string) => {
  try {
    return dayjs(dateString).format('MMMM D, YYYY');
  } catch {
    return dateString;
  }
};

function ReviewPlant({
  plantName,
  dateAdded,
  plantingType,
  removeFunction,
}: {
  plantName: string;
  dateAdded: string;
  plantingType: PlantingTypeEnum;
  removeFunction: () => void;
}) {
  const [show, setShow] = useState(true);
  return (
    <>
      {show ? (
        <Flex $direction="row" $justify="between" $align="center">
          <Flex $direction="column" $gap="8px" $mb="16px">
            <H4 $fontWeight={500} $color={COLORS.shrub}>
              {plantName}
            </H4>
            <ReviewGrid>
              <P2 $fontWeight={500}>Date Planted</P2>
              <P2>{formatDate(dateAdded)}</P2>
              <P2 $fontWeight={500}>Planting Type</P2>
              <P2>{plantingTypeLabels[plantingType]}</P2>
            </ReviewGrid>
          </Flex>
          <DeleteButton
            onClick={() => {
              removeFunction();
              setShow(false);
            }}
          >
            <Icon type="trashCan" />
          </DeleteButton>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
}

export default function Home() {
  const { profileData, profileReady, plantsToAdd } = useProfile();
  const { userId } = useAuth();
  const router = useRouter();
  const [showConfModal, setShowConfModal] = useState(false);
  const [duplicates, setDuplicates] = useState<string[]>([]);

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

  //correctly gets current date without being affected by timezones, in YYYY-MM-DD format
  const getDefaultDate = () => dayjs().format('YYYY-MM-DD');

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

  const confirmClick = () => {
    handleSubmit(true);
    setShowConfModal(false);
  };

  const handleSubmit = useCallback(
    async (confirm: boolean) => {
      // TODO: elegantly handle not logged in case (e.g. when someonee clicks "Back")
      // instead of doing userId!
      if (!userId) return;
      try {
        const completedDetails: Omit<
          UserPlant,
          | 'id'
        | 'date_removed'
        | 'recent_harvest'
        | 'num_harvested'
          | 'user_notes'
      >[] = details.map(detail => ({
          user_id: userId,
          plant_id: detail.plant_id!,
          date_added: detail.date_added!,
          planting_type: detail.planting_type!,
          water_frequency: detail.water_frequency!,
        weeding_frequency: detail.weeding_frequency!,
        plant_name: detail.plant_name!,
        date_added_to_db: getDefaultDate(),
      })).filter(plant => plant != undefined);
        const firstPress = await insertUserPlants(
          completedDetails,
          confirm,
          userId,
        );
        console.log(firstPress);
        if (!confirm) {
          if (firstPress?.length != 0) {
            if (firstPress) {
              const plantNames = await Promise.all(
                firstPress.map(async dup => {
                  const plant = await getPlantById(dup.plant_id);
                  return plant?.plant_name;
                }),
              );

              // Remove any undefined values (in case a lookup failed)
              setDuplicates(
                plantNames.filter((name): name is string => !!name),
              );
            }
            setShowConfModal(true);
          } else {
            await insertUserPlants(completedDetails, !confirm, userId);
          }
        }
        router.push('/view-plants');
      } catch (error) {
        console.error('Error inserting user plants:', error);
      }
      try {
      const tasks: Omit<SingleTask, 'id' | 'date_removed'>[] = details.flatMap(
        (d, i) => {
          const base = {
            user_id: userId,
            plant_id: d.plant_id!,
            plant_name: plantsToAdd[i].plant_name,
            isCompleted: false,
            previous_completed_date: getDefaultDate(),
            completed_date: getDefaultDate(),
            date_added_to_db: getDefaultDate(),
          };

          const p = plantsToAdd[i]; // shortcut

          return [
            { ...base, type: 'water', frequency: p.water_frequency },
            { ...base, type: 'weed', frequency: p.weeding_frequency },
            { ...base, type: 'harvest', frequency: p.harvest_season },
          ];
        },
      );

      await insertTasks(tasks);
    } catch (error) {
      console.error('Error inserting tasks:', error);
    }
  },
    [details, router, userId, plantsToAdd],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === 'Enter') {
        handleSubmit(false);
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
                  removeFunction={() => {
                    delete details[index];
                  }}
                />
              ))}
            </ReviewDetailsContainer>
            <Flex $direction="row" $justify="between" $maxW="500px" $mt="24px">
              <Button onClick={() => move(-1)} $secondaryColor={COLORS.shrub}>
                Back
              </Button>
              <Button
                onClick={() => handleSubmit(false)}
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
      <ConfirmationModal
        isOpen={showConfModal}
        title="Add Duplicates?"
        message={`${formatListWithAnd(duplicates)} ${duplicates.length === 1 ? 'is' : 'are'} already in your garden!`}
        leftText="No"
        rightText="Yes"
        onCancel={() => setShowConfModal(false)}
        onConfirm={confirmClick}
        flip={true}
      />
    </>
  );
}
