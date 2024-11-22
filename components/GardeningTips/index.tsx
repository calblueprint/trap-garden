'use client';

import COLORS from '@/styles/colors';
import Icon from '../Icon';
import {
  Container,
  IconWrapper,
  StyledTitle,
  TipsList,
  TitleWrapper,
} from './style';

export default function GardeningTips({
  plantName,
  plantTips,
}: {
  plantName: string;
  plantTips: string;
}) {
  const tipsArray = plantTips.split(/\d\.\s/).filter(Boolean);

  return (
    <Container>
      <TitleWrapper>
        <IconWrapper>
          <Icon type="lightbulb" />
        </IconWrapper>
        <StyledTitle $color={COLORS.shrub}>
          Gardening Tips for {plantName}
        </StyledTitle>
      </TitleWrapper>
      <TipsList>
        {tipsArray.map((tip, index) => (
          <li key={index}>{tip.trim()}</li>
        ))}
      </TipsList>
    </Container>
  );
}
