import React, { memo } from 'react';
import { Plant } from '@/types/schema';
import { mapMonthToSeason, toTitleCase } from '@/utils/helpers';
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
  ResponsiveP1,
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
          <ResponsiveP1 $fontWeight={400}>{plant.plant_name}</ResponsiveP1>
          <DifficultyLevelBar difficultyLevel={plant.difficulty_level} />
        </PlantHeader>

        <PlantAttributes>
          <Attribute>
            <Icon type="outdoorsSeason"></Icon>
            <AttributeContent>
              {toTitleCase(mapMonthToSeason(plant.outdoors_start) || 'Unknown')}
            </AttributeContent>
          </Attribute>
          <Attribute>
            <Icon type="harvestSeason"></Icon>
            <AttributeContent>
              {toTitleCase(plant.harvest_season)}
            </AttributeContent>
          </Attribute>
          <Attribute>
            <Icon type="wateringCan"></Icon>
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
