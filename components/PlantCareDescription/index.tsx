'use client';

import Icon from '../Icon';
import {
  CareItem,
  CareText,
  Container,
  IconWrapper,
  Strong,
  Title,
} from './style';

export default function PlantCareDescription({
  waterFreq,
  weedingFreq,
  sunlightMinHours,
  sunlightMaxHours,
}: {
  waterFreq: string;
  weedingFreq: string;
  sunlightMinHours: number;
  sunlightMaxHours: number;
}) {
  return (
    <Container>
      <Title>Plant Description</Title>
      <CareItem>
        <IconWrapper>
          <Icon type="watering_can" />
        </IconWrapper>
        <CareText>
          <Strong>Water Frequency:</Strong> {waterFreq}
        </CareText>
      </CareItem>
      <CareItem>
        <IconWrapper>
          <Icon type="watering_can" />
        </IconWrapper>
        <CareText>
          <Strong>Weeding Frequency:</Strong> {weedingFreq}
        </CareText>
      </CareItem>
      <CareItem>
        <IconWrapper>
          <Icon type="sun" />
        </IconWrapper>
        <CareText>
          <Strong>Sunlight Requirement:</Strong> {sunlightMinHours}-
          {sunlightMaxHours} hours (Full Sun)
        </CareText>
      </CareItem>
    </Container>
  );
}
