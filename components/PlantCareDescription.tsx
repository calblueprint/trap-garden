'use client';

import { IconType } from '@/lib/icons';
import { Flex } from '@/styles/containers';
import { H4, P3 } from '@/styles/text';
import { displaySunlightEnumFromHours } from '@/utils/helpers';
import Icon from './Icon';

function IconRow(iconType: IconType, boldText: string, text: string) {
  return (
    <Flex $align="center" $gap="8px">
      <Icon type={iconType} />
      <P3 as="span">
        <P3 $fontWeight={500} as="span">
          {boldText}
        </P3>{' '}
        {text}
      </P3>
    </Flex>
  );
}

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
  const sunlightText = `${sunlightMinHours} ${sunlightMaxHours ? ` - ${sunlightMaxHours}` : ''} hours (${displaySunlightEnumFromHours(sunlightMinHours)})`;
  return (
    <Flex $direction="column" $gap="12px" $pl="8px">
      <H4>Plant Description</H4>
      <Flex $direction="column" $gap="8px">
        {IconRow('wateringCan', 'Watering Frequency:', waterFreq)}
        {IconRow('wateringCan', 'Weeding Frequency:', weedingFreq)}
        {IconRow('sun', 'Sunlight Requirement:', sunlightText)}
      </Flex>
    </Flex>
  );
}
