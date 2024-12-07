'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { getPlantById } from '@/api/supabase/queries/plants';
import DifficultyLevelBar from '@/components/DifficultyLevelBar';
import GardeningTips from '@/components/GardeningTips';
import PlantCalendarRow from '@/components/PlantCalendarRow';
import PlantCareDescription from '@/components/PlantCareDescription';
import { Flex } from '@/styles/containers';
import { H4 } from '@/styles/text';
import { Plant } from '@/types/schema';
import { useProfile } from '@/utils/ProfileProvider';
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
import { AddPlant } from './style';

export default function GeneralPlantPage() {
  const router = useRouter();

  const params = useParams();
  const plantId: UUID = params.plantId as UUID;
  const [currentPlant, setCurrentPlant] = useState<Plant>();
  const { profileReady, profileData, setPlantsToAdd } = useProfile();

  useEffect(() => {
    const getPlant = async () => {
      const plant = await getPlantById(plantId);
      setCurrentPlant(plant);
    };
    getPlant();
  }, [plantId]);

  const handleAdd = () => {
    // assume user is onboarded
    if (!currentPlant) return;
    setPlantsToAdd([currentPlant]);
    router.push('/add-details');
  };

  return currentPlant ? (
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
        </ButtonWrapper>
        <PlantImage src={currentPlant.img} alt={currentPlant.plant_name} />
      </ImgHeader>
      <Content>
        <Flex $justify="between" $align="center" $mb="36px">
          <NameWrapper>
            <PlantName>{currentPlant.plant_name}</PlantName>
            <DifficultyLevelBar
              difficultyLevel={currentPlant.difficulty_level}
            />
          </NameWrapper>
          {/*Add button only appears if user is logged in and onboarded*/}
          {profileReady && profileData && (
            <AddPlant onClick={handleAdd}>Add +</AddPlant>
          )}
        </Flex>
        <ComponentWrapper>
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
            />
          </Flex>
        </ComponentWrapper>
      </Content>
    </>
  ) : (
    <>Loading</>
  );
}
