import React from 'react';
import { Plant } from '@/types/schema';
import {
  Attribute,
  Card,
  CardContent,
  CardPic,
  PlantAttributes,
  RoundCheck,
  TopRight,
} from './styles';

export default function PlantCard({
  plant,
  canSelect,
  isSelected,
  onToggleSelect,
}: {
  plant: Plant;
  canSelect: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}) {
  return (
    <Card
      className={isSelected ? 'greenBorder' : ''}
      onClick={canSelect ? onToggleSelect : undefined}
      id={plant.id}
    >
      {canSelect && (
        <TopRight>
          <RoundCheck checked={isSelected} readOnly id={plant.id + 'check'} />
        </TopRight>
      )}
      <CardPic>
        <img alt={plant.plant_name} />
      </CardPic>
      <CardContent>
        <h2>{plant.plant_name}</h2>
        <PlantAttributes>
          <Attribute>
            <p>{plant.harvest_start + ' - ' + plant.harvest_end}</p>
          </Attribute>
          <Attribute>
            <p>{plant.water_frequency}</p>
          </Attribute>
          <Attribute>
            <p>
              {plant.sunlight_min_hours}
              {plant.sunlight_max_hours
                ? ' - ' + plant.sunlight_max_hours
                : ''}{' '}
              hours/day
            </p>
          </Attribute>
        </PlantAttributes>
      </CardContent>
    </Card>
  );
}
