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
}: {
  plant: Plant;
  canSelect: boolean;
}) {
  function toggle() {
    const elem = document.getElementById(plant.id);
    elem!.classList.toggle('greenBorder');
  }

  return (
    <Card id={plant.id}>
      {canSelect && (
        <TopRight>
          <RoundCheck onClick={toggle} />
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
