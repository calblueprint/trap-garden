import React from 'react';
import { Plant } from '@/types/schema';
import { mapMonthToSeason, useTitleCase } from '@/utils/helpers';
import DifficultyLevelBar from '../DifficultyLevelBar';
import Icon from '../Icon';
import {
  Attribute,
  AttributeContent,
  Card,
  CardContent,
  CardPic,
  PlantAttributes,
  PlantHeader,
  PlantImage,
  PlantName,
  RoundCheck,
  TopRight,
} from './styles';

export default function PlantCard({
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
    <Card $isSelected={isSelected} onClick={onClick} id={plant.id}>
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
          <PlantName>{plant.plant_name}</PlantName>
          <DifficultyLevelBar difficultyLevel={plant.difficulty_level} />
        </PlantHeader>

        <PlantAttributes>
          <Attribute>
            <Icon type="outdoors_growing_start"></Icon>
            <AttributeContent>{`${useTitleCase(mapMonthToSeason(plant.outdoors_start))}`}</AttributeContent>
          </Attribute>
          <Attribute>
            <Icon type="outdoors_growing_end"></Icon>
            <AttributeContent>{`${useTitleCase(mapMonthToSeason(plant.outdoors_end))}`}</AttributeContent>
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
    </Card>
  );
}
