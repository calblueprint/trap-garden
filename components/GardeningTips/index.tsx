'use client';

import COLORS from '@/styles/colors';
import { P1, P3 } from '@/styles/text';
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
        <P1 $fontWeight="400" $color={COLORS.shrub}>
          Gardening Tips for {plantName}
        </P1>
      </TitleWrapper>
      <TipsList>
        {tipsArray.map((tip, index) => (
          <P3 as="li" key={index}>
            {tip.trim()}
          </P3>
        ))}
      </TipsList>
    </Container>
  );
}
