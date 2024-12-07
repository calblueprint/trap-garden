'use client';

import { Flex } from '@/styles/containers';
import { H4, P3 } from '@/styles/text';
import { displaySunlightEnumFromHours } from '@/utils/helpers';
import Icon from '../Icon';
import { CareItem, IconWrapper, Strong } from './style';

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
    <Flex $direction="column" $gap="12px" $pl="8px">
      <H4>Plant Description</H4>
      <Flex $direction="column" $gap="8px">
        <CareItem>
          <IconWrapper>
            <Icon type="watering_can" />
          </IconWrapper>
          <P3 as="span">
            <Strong>Watering Frequency:</Strong> {waterFreq}
          </P3>
        </CareItem>
        <CareItem>
          <IconWrapper>
            <Icon type="watering_can" />
          </IconWrapper>
          <P3 as="span">
            <Strong>Weeding Frequency:</Strong> {weedingFreq}
          </P3>
        </CareItem>
        <CareItem>
          <IconWrapper>
            <Icon type="sun" />
          </IconWrapper>
          <P3 as="span">
            <Strong>Sunlight Requirement:</Strong> {sunlightMinHours}
            {sunlightMaxHours ? ` - ${sunlightMaxHours}` : ''} hours (
            {displaySunlightEnumFromHours(sunlightMinHours)})
          </P3>
        </CareItem>
      </Flex>
    </Flex>
  );
}
