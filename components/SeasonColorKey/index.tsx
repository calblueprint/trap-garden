import React from 'react';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P3 } from '@/styles/text';
import {
  ColorCell,
  ColorKeyItemContainer,
  SeasonColorKeyContainer,
} from './styles';

function ColorKeyItem({ label, color }: { label: string; color: string }) {
  return (
    <ColorKeyItemContainer>
      <ColorCell $color={color} />
      <P3>{label}</P3>
    </ColorKeyItemContainer>
  );
}

export default function SeasonColorKey() {
  return (
    <Flex $justify="center">
      <SeasonColorKeyContainer>
        <ColorKeyItem label="Indoor Season" color={COLORS.indoors} />
        <ColorKeyItem label="Transplant" color={COLORS.transplant} />
        <ColorKeyItem label="Outdoor Season" color={COLORS.outdoors} />
        <ColorKeyItem label="Harvest Season" color={COLORS.harvest} />
      </SeasonColorKeyContainer>
    </Flex>
  );
}
