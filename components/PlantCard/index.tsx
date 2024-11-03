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
    // Toggle the green border on the Card
    const elem = document.getElementById(plant.id);
    elem!.classList.toggle('greenBorder');

    // Toggle the checkbox state
    const checkBox = document.getElementById(
      plant.id + 'check',
    ) as HTMLInputElement;
    checkBox.checked = !checkBox.checked;
  }
  function toggleCheck() {
    const checkBox = document.getElementById(
      plant.id + 'check',
    ) as HTMLInputElement;
    checkBox.checked = !checkBox.checked;
  }

  return (
    <Card onClick={toggle} id={plant.id}>
      {canSelect && (
        <TopRight>
          <RoundCheck onClick={toggleCheck} id={plant.id + 'check'} />
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
