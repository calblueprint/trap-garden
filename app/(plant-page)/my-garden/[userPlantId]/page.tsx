'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { getMatchingPlantForUserPlant } from '@/api/supabase/queries/plants';
import { deletePlantTasks } from '@/api/supabase/queries/tasks';
import {
  getUserPlantById,
  updateUserNote,
  upsertUserPlant,
} from '@/api/supabase/queries/userPlants';
import { BigButton, SmallButton } from '@/components/Buttons';
import Loader from '@/components/CircularLoader/loader';
import DifficultyLevelBar from '@/components/DifficultyLevelBar';
import GardeningTips from '@/components/GardeningTips';
import PlantCalendarRow from '@/components/PlantCalendarRow';
import PlantCareDescription from '@/components/PlantCareDescription';
import TextInput from '@/components/TextInput';
import YourPlantDetails from '@/components/YourPlantDetails';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H4, P3 } from '@/styles/text';
import { Plant, UserPlant } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { getCurrentTimestamp } from '@/utils/helpers';
import {
  BackButton,
  ButtonWrapper,
  ComponentWrapper,
  Content,
  ImgHeader,
  NameWrapper,
  PlantImage,
  PlantName,
} from '../../style';

export default function UserPlantPage() {
  const router = useRouter();
  const params = useParams();
  const userPlantId: UUID = params.userPlantId as UUID;
  const [currentPlant, setCurrentPlant] = useState<Plant>();
  const [currentUserPlant, setCurrentUserPlant] = useState<UserPlant>();
  const [isHarvesting, setIsHarvesting] = useState(false);

  const { userId } = useAuth();

  function handleHarvestAnimation() {
    setIsHarvesting(true);
    setTimeout(() => setIsHarvesting(false), 1000);
  }
  const [userNotes, setUserNotes] = useState<string>('');
  const [canSaveNotes, setCanSaveNotes] = useState<boolean>(false);

  useEffect(() => {
    const getPlant = async () => {
      const userPlant = await getUserPlantById(userPlantId);
      setCurrentUserPlant(userPlant);
      setUserNotes(userPlant.user_notes ?? '');
      const plant = await getMatchingPlantForUserPlant(userPlant);
      setCurrentPlant(plant);
    };
    getPlant();
  }, [userPlantId]);

  async function removePlant() {
    if (!currentUserPlant) return;
    try {
      // Originally, removeUserPlantById(userPlantId);
      currentUserPlant.date_removed = getCurrentTimestamp();
      await upsertUserPlant(currentUserPlant);
      await deletePlantTasks(
        currentUserPlant.user_id,
        currentUserPlant.plant_id,
      );
    } catch (error) {
      console.error(error);
    }
    router.push(`${CONFIG.viewPlants}`);
  }

  const handleUserNotesChange = (newUserNotes: string) => {
    setCanSaveNotes(true);
    setUserNotes(newUserNotes);
  };

  const handleSaveNotes = async () => {
    try {
      if (!userId || !currentUserPlant) {
        console.error('User ID or user plant data missing');
        return;
      }

      await updateUserNote(
        userId as UUID,
        currentUserPlant.plant_id!,
        userNotes,
      );
    } catch (err) {
      console.error('Error saving notes:', err);
    }
    setCanSaveNotes(false);
  };

  return currentPlant && currentUserPlant ? (
    <>
      <ImgHeader>
        <ButtonWrapper>
          <BackButton
            onClick={() => {
              router.push(`${CONFIG.viewPlants}`);
            }}
          >
            ←
          </BackButton>
          <SmallButton $primaryColor={COLORS.errorRed} onClick={removePlant}>
            X Remove
          </SmallButton>
        </ButtonWrapper>
        <PlantImage
          src={currentPlant.img}
          alt={currentPlant.plant_name}
          $isHarvesting={isHarvesting}
        />
      </ImgHeader>

      <Content>
        <Flex $direction="column" $gap="2px" $mb="12px">
          <NameWrapper>
            <PlantName>{currentPlant.plant_name}</PlantName>
            <DifficultyLevelBar
              difficultyLevel={currentPlant.difficulty_level}
            />
          </NameWrapper>
          <P3
            $fontWeight={400}
            $color={COLORS.shrub}
            style={{ fontStyle: 'italic' }}
          >
            You have this plant in your garden!
          </P3>
        </Flex>
        <ComponentWrapper>
          <YourPlantDetails
            datePlanted={currentUserPlant.date_added}
            plantingType={currentUserPlant.planting_type}
            recentHarvestDate={currentUserPlant.recent_harvest}
            id={currentUserPlant.id}
            onHarvest={handleHarvestAnimation}
            plant_id={currentUserPlant.plant_id}
            user_id={currentUserPlant.user_id}
          />

          <TextInput
            label={'Notes'}
            id={'user_notes'}
            type={'user_notes'}
            value={userNotes}
            onChange={handleUserNotesChange}
          ></TextInput>

          <BigButton
            type="button"
            onClick={handleSaveNotes}
            $primaryColor={COLORS.shrub}
            disabled={!canSaveNotes}
          >
            Save
          </BigButton>

          <GardeningTips
            plantName={currentPlant.plant_name}
            plantTips={currentPlant.plant_tips}
          />

          <PlantCareDescription
            waterFreq={currentPlant.water_frequency}
            weedingFreq={currentPlant.weeding_frequency}
            sunlightMaxHours={currentPlant.sunlight_max_hours}
            sunlightMinHours={currentPlant.sunlight_min_hours}
          />

          <Flex $direction="column" $gap="8px">
            <H4>Planting Timeline</H4>
            <PlantCalendarRow
              harvestStart={currentPlant.harvest_start}
              harvestEnd={currentPlant.harvest_end}
              transplantStart={currentPlant.transplant_start}
              transplantEnd={currentPlant.transplant_end}
              indoorsStart={currentPlant.indoors_start}
              indoorsEnd={currentPlant.indoors_end}
              outdoorsStart={currentPlant.outdoors_start}
              outdoorsEnd={currentPlant.outdoors_end}
              singleDisplay
            />
          </Flex>
        </ComponentWrapper>
      </Content>
    </>
  ) : (
    <Loader />
  );
}
