'use client';

import { PlantingTypeEnum } from '@/types/schema';
import Icon from '../Icon';
import {
  Container,
  DetailRow,
  DetailsContainer,
  DetailText,
  EditButton,
  Header,
  StyledIcon,
  Title,
} from './style';

export default function YourPlantDetails({
  datePlanted,
  plantingType,
  recentHarvestDate,
}: {
  datePlanted: string;
  plantingType: PlantingTypeEnum;
  recentHarvestDate: string;
}) {
  return (
    <Container>
      <Header>
        <Title>Your Plant Details</Title>
        <EditButton secondaryColor="#1b5e20">Edit</EditButton>
      </Header>

      <DetailsContainer>
        <DetailRow>
          <StyledIcon>
            <Icon type="watering_can" />
          </StyledIcon>
          <DetailText>Date Planted: {datePlanted}</DetailText>
        </DetailRow>

        <DetailRow>
          <StyledIcon>
            <Icon type="watering_can" />
          </StyledIcon>
          <DetailText>
            Planting Type:{' '}
            {plantingType.charAt(0) + plantingType.slice(1).toLowerCase()}
          </DetailText>
        </DetailRow>

        {recentHarvestDate && (
          <DetailRow>
            <StyledIcon>
              <Icon type="watering_can" />
            </StyledIcon>
            <DetailText>
              Most Recent Harvest Date: {recentHarvestDate}
            </DetailText>
          </DetailRow>
        )}
      </DetailsContainer>
    </Container>
  );
}
