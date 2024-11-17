'use client';

import { DifficultyLevelEnum } from '@/types/schema';
import { Bar, IndicatorContainer } from './style';

export default function DifficultyLevelBar({
  difficultyLevel,
}: {
  difficultyLevel: DifficultyLevelEnum;
}) {
  const colors = {
    EASY: ['#8bc34a', '#e0e0e0', '#e0e0e0'],
    MODERATE: ['#fbc02d', '#fbc02d', '#e0e0e0'],
    HARD: ['#e53935', '#e53935', '#e53935'],
  };

  const selectedColors = colors[difficultyLevel];

  return (
    <IndicatorContainer>
      {selectedColors.map((color, index) => (
        <Bar
          key={index}
          active={color !== '#e0e0e0'}
          color={color}
          position={index === 0 ? 'left' : index === 2 ? 'right' : 'middle'}
        />
      ))}
    </IndicatorContainer>
  );
}
