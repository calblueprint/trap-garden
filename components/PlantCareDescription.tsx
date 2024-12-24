'use client';

import { IconType } from '@/lib/icons';
import { Flex } from '@/styles/containers';
import { H4, P3 } from '@/styles/text';
import { displaySunlightEnumFromHours } from '@/utils/helpers';
import Icon from './Icon';

type IconRowProps = {
  iconType: IconType;
  boldText: string;
  text: string;
};

function IconRow({ iconType, boldText, text }: IconRowProps) {
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
      <H4>Plant Care Description</H4>
      <Flex $direction="column" $gap="8px">
        <IconRow
          iconType="wateringCan"
          boldText="Watering Frequency:"
          text={waterFreq}
        />
        <IconRow
          iconType="wateringCan"
          boldText="Weeding Frequency:"
          text={weedingFreq}
        />
        <IconRow
          iconType="sun"
          boldText="Sunlight Requirement:"
          text={sunlightText}
        />
      </Flex>
    </Flex>
  );
}
