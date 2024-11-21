'use client';

import COLORS from '@/styles/colors';
import { H3 } from '@/styles/text';
import { PlantingTypeEnum } from '@/types/schema';
import { formatTimestamp, useTitleCase } from '@/utils/helpers';
import Icon from '../Icon';
import {
  Container,
  DetailRow,
  DetailsContainer,
  DetailText,
  EditButton,
  Header,
  StyledIcon,
} from './style';

export default function YourPlantDetails({
  datePlanted,
  plantingType,
  recentHarvestDate,
}: {
  datePlanted: string;
  plantingType: PlantingTypeEnum;
  recentHarvestDate: string | null;
}) {
  return (
    <Container>
      <Header>
        <H3 $color={COLORS.shrub}>Your Plant Details</H3>
        <EditButton $secondaryColor={COLORS.shrub}>Edit</EditButton>
      </Header>
      <DetailsContainer>
        <DetailRow>
          <StyledIcon>
            <Icon type="calendar" />
          </StyledIcon>
          <DetailText>Date Planted: {formatTimestamp(datePlanted)}</DetailText>
        </DetailRow>

        <DetailRow>
          <StyledIcon>
            <Icon type="plant_hand" />
          </StyledIcon>
          <DetailText>Planting Type: {useTitleCase(plantingType)}</DetailText>
        </DetailRow>

        {recentHarvestDate && (
          <DetailRow>
            <StyledIcon>
              <Icon type="plant" />
            </StyledIcon>
            <DetailText>
              Most Recent Harvest Date: {formatTimestamp(recentHarvestDate)}
            </DetailText>
          </DetailRow>
        )}
      </DetailsContainer>
    </Container>
  );
}
