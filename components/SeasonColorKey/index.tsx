import React from 'react';
import COLORS from '@/styles/colors';
import {
  ColorCell,
  ColorItemLabel,
  ColorKeyItemContainer,
  ComponentContainer,
  SeasonColorKeyContainer,
} from './styles';

function ColorKeyItem({ label, color }: { label: string; color: string }) {
  return (
    <ColorKeyItemContainer>
      <ColorCell $color={color} />
      <ColorItemLabel>{label}</ColorItemLabel>
    </ColorKeyItemContainer>
  );
}

export default function SeasonColorKey() {
  return (
    <ComponentContainer>
      <SeasonColorKeyContainer>
        <ColorKeyItem label="Indoor" color={COLORS.indoors} />
        <ColorKeyItem label="Transplant" color={COLORS.transplant} />
        <ColorKeyItem label="Outdoor" color={COLORS.outdoors} />
        <ColorKeyItem label="Harvest" color={COLORS.harvest} />
      </SeasonColorKeyContainer>
    </ComponentContainer>
  );
}
