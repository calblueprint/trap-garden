'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { getMatchingPlantForUserPlant } from '@/api/supabase/queries/plants';
import {
  getUserPlantById,
  removeUserPlantById,
} from '@/api/supabase/queries/userPlants';
import DifficultyLevelBar from '@/components/DifficultyLevelBar';
import GardeningTips from '@/components/GardeningTips';
import PlantCareDescription from '@/components/PlantCareDescription';
import YourPlantDetails from '@/components/YourPlantDetails';
import { Plant, PlantingTypeEnum, UserPlant } from '@/types/schema';
import {
  BackButton,
  ButtonWrapper,
  Container,
  Content,
  Header,
  HeaderContent,
  NameWrapper,
  PlantImage,
  PlantName,
  RemoveButton,
  Subtitle,
  TitleWrapper,
} from './style';

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
    await removeUserPlantById(userPlantId);
    router.push(`/view-plants`);
  }

  return (
    <Container>
      {currentPlant && currentUserPlant && (
        <>
          <Header>
            <HeaderContent>
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
              <PlantImage
                src={currentPlant.img}
                alt={currentPlant.plant_name}
              />
            </HeaderContent>
          </Header>

          <Content>
            <TitleWrapper>
              <NameWrapper>
                <PlantName>{currentPlant.plant_name}</PlantName>
                <DifficultyLevelBar
                  difficultyLevel={currentPlant.difficulty_level}
                />
              </NameWrapper>
              <Subtitle>You have this plant in your garden!</Subtitle>
            </TitleWrapper>

            <YourPlantDetails
              datePlanted={currentUserPlant.date_added}
              plantingType={currentUserPlant.planting_type as PlantingTypeEnum}
              recentHarvestDate={currentUserPlant.date_harvested}
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
          </Content>
        </>
      )}
    </Container>
  );
}
