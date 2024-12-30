import React from 'react';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P3 } from '@/styles/text';
import { DifficultyLevelEnum } from '@/types/schema';
import { toTitleCase } from '@/utils/helpers';
import DifficultyLevelBar from '../DifficultyLevelBar';
import Icon from '../Icon';
import {
  DifficultyLevelsContainer,
  HorizontalLine,
  IconKeyContainer,
  PlantCardKeyContainer,
  Title,
} from './styles';

const DifficultyBarAndLabel = ({
  difficultyLevel,
}: {
  difficultyLevel: DifficultyLevelEnum;
}) => {
  return (
    <Flex $direction="column" $align="center" $gap="4px">
      <DifficultyLevelBar difficultyLevel={difficultyLevel} />
      <P3>{toTitleCase(difficultyLevel)}</P3>
    </Flex>
  );
};

const IconAndLabel = ({
  iconName,
  label,
}: {
  iconName: IconType;
  label: string;
}) => {
  return (
    <Flex $direction="row" $gap="6px" $align="center">
      <Icon type={iconName} />
      <P3>{label}</P3>
    </Flex>
  );
};

export default function PlantCardKey() {
  return (
    <PlantCardKeyContainer>
      <Title>
        <P3 $color="white" $fontWeight={400}>
          Plant Card Key
        </P3>
      </Title>
      <Flex $direction="column" $p="16px" $align="start" $gap="8px">
        <P3 $color={COLORS.shrub} $fontWeight={400}>
          Planting Difficulty Level
        </P3>
        <DifficultyLevelsContainer>
          <DifficultyBarAndLabel difficultyLevel="EASY" />
          <DifficultyBarAndLabel difficultyLevel="MODERATE" />
          <DifficultyBarAndLabel difficultyLevel="HARD" />
        </DifficultyLevelsContainer>
        <HorizontalLine />
        <IconKeyContainer>
          <P3 $color={COLORS.shrub} $fontWeight={400}>
            Icon Key
          </P3>
          <IconAndLabel
            iconName="outdoorsSeason"
            label="Outdoors Growing Season"
          />
          <IconAndLabel iconName="harvestSeason" label="Harvest Time" />
          <IconAndLabel iconName="wateringCan" label="Water Frequency" />
          <IconAndLabel iconName="sun" label="Sunlight Requirement" />
        </IconKeyContainer>
      </Flex>
    </PlantCardKeyContainer>
  );
}
