'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { getPlantById } from '@/api/supabase/queries/plants';
import DifficultyLevelBar from '@/components/DifficultyLevelBar';
import GardeningTips from '@/components/GardeningTips';
import PlantCareDescription from '@/components/PlantCareDescription';
import { Plant } from '@/types/schema';
import {
  AddPlant,
  BackButton,
  ButtonWrapper,
  Container,
  Content,
  Header,
  HeaderContent,
  NameWrapper,
  PlantImage,
  PlantName,
  TitleWrapper,
} from './style';

export default function GeneralPlantPage() {
  const router = useRouter();

  const params = useParams();
  const plantId: UUID = params.plantId as UUID;
  const [currentPlant, setCurrentPlant] = useState<Plant>();
  useEffect(() => {
    const getPlant = async () => {
      const plant = await getPlantById(plantId);
      setCurrentPlant(plant);
    };
    getPlant();
  }, [plantId]);
  return (
    <Container>
      {currentPlant && (
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
              <AddPlant>Add +</AddPlant>
            </TitleWrapper>

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
