'use client';

import COLORS from '@/styles/colors';
import { H3 } from '@/styles/text';
import Icon from '../Icon';
import { Container, IconWrapper, TipsList, TitleWrapper } from './style';

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
        <H3 $color={COLORS.shrub}>Gardening Tips for {plantName}</H3>
      </TitleWrapper>
      <TipsList>
        {tipsArray.map((tip, index) => (
          <li key={index}>{tip.trim()}</li>
        ))}
      </TipsList>
    </Container>
  );
}
