'use client';

import COLORS from '@/styles/colors';
import { P1 } from '@/styles/text';
import { PlantingTypeEnum } from '@/types/schema';
import { formatTimestamp, useTitleCase } from '@/utils/helpers';
import Icon from '../Icon';
import {
  Container,
  DetailRow,
  DetailsContainer,
  DetailText,
  Header,
  // EditButton,
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
        <P1 $fontWeight={500} $color={COLORS.shrub}>
          Your Plant Details
        </P1>
        {/* <EditButton $secondaryColor={COLORS.shrub}>Edit</EditButton> */}
      </Header>
      <DetailsContainer>
        <DetailRow>
          <Icon type="calendar" />
          <DetailText>Date Planted: {formatTimestamp(datePlanted)}</DetailText>
        </DetailRow>

        <DetailRow>
          <Icon type="plantHand" />
          <DetailText>Planting Type: {useTitleCase(plantingType)}</DetailText>
        </DetailRow>

        {recentHarvestDate && (
          <DetailRow>
            <Icon type="plant" />
            <DetailText>
              Most Recent Harvest Date: {formatTimestamp(recentHarvestDate)}
            </DetailText>
          </DetailRow>
        )}
      </DetailsContainer>
    </Container>
  );
}
