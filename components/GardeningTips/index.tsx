'use client';

import Icon from '../Icon';
import { Container, IconWrapper, TipsList, Title } from './style';

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
      <Title>
        <IconWrapper>
          <Icon type="lightbulb" />
        </IconWrapper>
        Gardening Tips for {plantName}
      </Title>
      <TipsList>
        {tipsArray.map((tip, index) => (
          <li key={index}>{tip.trim()}</li>
        ))}
      </TipsList>
    </Container>
  );
}
