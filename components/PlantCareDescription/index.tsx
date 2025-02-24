'use client';

import Icon from '../Icon';
import { CareItem, CareText, Container, IconWrapper, Title } from './style';

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
          <strong>Water Frequency:</strong> {waterFreq}
        </CareText>
      </CareItem>
      <CareItem>
        <IconWrapper>
          <Icon type="watering_can" />
        </IconWrapper>
        <CareText>
          <strong>Weeding Frequency:</strong> {weedingFreq}
        </CareText>
      </CareItem>
      <CareItem>
        <IconWrapper>
          <Icon type="sun" />
        </IconWrapper>
        <CareText>
          <strong>Sunlight Requirement:</strong> {sunlightMinHours}-
          {sunlightMaxHours} hours (Full Sun)
        </CareText>
      </CareItem>
    </Container>
  );
}
