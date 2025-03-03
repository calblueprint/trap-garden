import React from 'react';
import { Category } from '@/types/schema';
import { Card, Text, Title } from './styles';

// Define the category type with specific values

// Map category values to headers
const categoryHeaders: Record<Category, string> = {
  'Helpful Flowers for Your Garden': 'Helpful Flowers',
  'Water Management': 'Water Tips',
  Mulching: 'Mulching Tips',
  Harvesting: 'Harvesting Tips',
  Planting: 'Planting Tips',
  Weeding: 'Weeding Tips',
};

// Define the prop type
interface TipCardProps {
  category: Category;
  body_text: string;
}

// Styled components

export default function TipCard({ category, body_text }: TipCardProps) {
  return (
    <Card>
      <Title>Tip of the Day</Title>
      <Text>{categoryHeaders[category]}</Text>
      <Text>{body_text}</Text>
    </Card>
  );
}
