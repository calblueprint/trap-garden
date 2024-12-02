import React, { memo } from 'react';
import { P1 } from '@/styles/text';
import { Plant } from '@/types/schema';
import { mapMonthToSeason, useTitleCase } from '@/utils/helpers';
import DifficultyLevelBar from '../DifficultyLevelBar';
import Icon from '../Icon';
import {
  Attribute,
  AttributeContent,
  CardContainer,
  CardContent,
  CardPic,
  PlantAttributes,
  PlantHeader,
  PlantImage,
  RoundCheck,
  TopRight,
} from './styles';

const PlantCard = memo(function PlantCard({
  plant,
  canSelect,
  isSelected = false,
  onClick,
}: {
  plant: Plant;
  canSelect: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <CardContainer $isSelected={isSelected} onClick={onClick} id={plant.id}>
      {canSelect && (
        <TopRight>
          <RoundCheck checked={isSelected} readOnly id={`${plant.id}-check`} />
        </TopRight>
      )}
      <CardPic>
        <PlantImage src={plant.img} alt={plant.plant_name} />
      </CardPic>
      <CardContent>
        <PlantHeader>
          <P1 $fontWeight={400}>{plant.plant_name}</P1>
          <DifficultyLevelBar difficultyLevel={plant.difficulty_level} />
        </PlantHeader>

        <PlantAttributes>
          <Attribute>
            <Icon type="outdoorsSeason"></Icon>
            <AttributeContent>
              {useTitleCase(
                mapMonthToSeason(plant.outdoors_start) || 'Unknown',
              )}
            </AttributeContent>
          </Attribute>
          <Attribute>
            <Icon type="harvestSeason"></Icon>
            <AttributeContent>
              {useTitleCase(plant.harvest_season)}
            </AttributeContent>
          </Attribute>
          <Attribute>
            <Icon type="watering_can"></Icon>
            <AttributeContent>{plant.water_frequency}</AttributeContent>
          </Attribute>
          <Attribute>
            <Icon type="sun"></Icon>
            <AttributeContent>
              {plant.sunlight_min_hours}
              {plant.sunlight_max_hours
                ? ` - ${plant.sunlight_max_hours}`
                : ''}{' '}
              hours/day
            </AttributeContent>
          </Attribute>
        </PlantAttributes>
      </CardContent>
    </CardContainer>
  );
});

export default PlantCard;
