import React from 'react';
import { IconType } from '@/lib/icons';
import { TipCategory } from '@/types/schema';
import Icon from '../Icon';
import { Card, Content, IconWrapper, Text, Title } from './styles';

// Define the category type with specific values

// Map category values to headers
const categoryHeaders: Record<TipCategory, string> = {
  'Helpful Flowers for Your Garden': 'Helpful Flowers',
  'Water Management': 'Water Tip',
  Mulching: 'Mulching Tip',
  Harvesting: 'Harvesting Tip',
  Planting: 'Planting Tip',
  Weeding: 'Weeding Tip',
};

//Map category values to icon name
const categoryIcons: Record<TipCategory, IconType> = {
  'Helpful Flowers for Your Garden': 'flower',
  'Water Management': 'wateringCan',
  Mulching: 'lawnCare',
  Harvesting: 'harvestingBasket',
  Planting: 'plantHand',
  Weeding: 'spade',
};

// Define the prop type
interface TipCardProps {
  category: TipCategory;
  body_text: string;
}

// Styled components

export default function TipCard({ category, body_text }: TipCardProps) {
  return (
    <Card>
      <IconWrapper>
        <Icon type={categoryIcons[category]} />
      </IconWrapper>
      <Content>
        <Title>{categoryHeaders[category]}</Title>
        <Text>{body_text}</Text>
      </Content>
    </Card>
  );
}
