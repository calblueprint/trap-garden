'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { getMatchingPlantForUserPlant } from '@/api/supabase/queries/plants';
import {
  getUserPlantById,
  upsertUserPlant,
} from '@/api/supabase/queries/userPlants';
import DifficultyLevelBar from '@/components/DifficultyLevelBar';
import GardeningTips from '@/components/GardeningTips';
import PlantCalendarRow from '@/components/PlantCalendarRow';
import PlantCareDescription from '@/components/PlantCareDescription';
import YourPlantDetails from '@/components/YourPlantDetails';
import { Flex } from '@/styles/containers';
import { H4 } from '@/styles/text';
import { Plant, UserPlant } from '@/types/schema';
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
import { RemoveButton, Subtitle } from './style';

export default function UserPlantPage() {
  const router = useRouter();
  const params = useParams();
  const userPlantId: UUID = params.userPlantId as UUID;
  const [currentPlant, setCurrentPlant] = useState<Plant>();
  const [currentUserPlant, setCurrentUserPlant] = useState<UserPlant>();

  useEffect(() => {
    const getPlant = async () => {
      const userPlant = await getUserPlantById(userPlantId);
      setCurrentUserPlant(userPlant);
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
    } catch (error) {
      console.error(error);
    }
    router.push(`/view-plants`);
  }

  return currentPlant && currentUserPlant ? (
    <>
      <ImgHeader>
        <ButtonWrapper>
          <BackButton
            onClick={() => {
              router.push(`/view-plants`);
            }}
          >
            ←
          </BackButton>
          <RemoveButton onClick={removePlant}>X Remove</RemoveButton>
        </ButtonWrapper>
        <PlantImage src={currentPlant.img} alt={currentPlant.plant_name} />
      </ImgHeader>

      <Content>
        <Flex $direction="column" $gap="2px" $mb="12px">
          <NameWrapper>
            <PlantName>{currentPlant.plant_name}</PlantName>
            <DifficultyLevelBar
              difficultyLevel={currentPlant.difficulty_level}
            />
          </NameWrapper>
          <Subtitle>You have this plant in your garden!</Subtitle>
        </Flex>
        <ComponentWrapper>
          <YourPlantDetails
            datePlanted={currentUserPlant.date_added}
            plantingType={currentUserPlant.planting_type}
            recentHarvestDate={null} // eventually currentUserPlant.recent_date_harvested
          />

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
            {/*add SeasonalColorKey here */}
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
    <>Loading</>
  );
}
