import React from 'react';
import COLORS from '@/styles/colors';
import { P3 } from '@/styles/text';
import {
  ColorCell,
  ColorKeyItemContainer,
  SeasonColorKeyContainer,
} from './styles';

const ColorKeyItem = (label: string, color: string) => {
  return (
    <ColorKeyItemContainer>
      <ColorCell $color={color} />
      <P3>{label}</P3>
    </ColorKeyItemContainer>
  );
};

export default function SeasonColorKey() {
  return (
    <SeasonColorKeyContainer>
      {ColorKeyItem('Indoor Season', COLORS.indoors)}
      {ColorKeyItem('Transplant', COLORS.transplant)}
      {ColorKeyItem('Outdoor Season', COLORS.outdoors)}
      {ColorKeyItem('Harvest Season', COLORS.harvest)}
    </SeasonColorKeyContainer>
  );
}
