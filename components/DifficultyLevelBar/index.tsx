'use client';

import { DifficultyLevelEnum } from '@/types/schema';
import Icon from '../Icon';

export default function DifficultyLevelBar({
  difficultyLevel,
}: {
  difficultyLevel: DifficultyLevelEnum;
}) {
  return (
    <div>
      {difficultyLevel === 'EASY' && <Icon type="easy_bar"></Icon>}
      {difficultyLevel === 'MODERATE' && <Icon type="moderate_bar"></Icon>}
      {difficultyLevel === 'HARD' && <Icon type="hard_bar"></Icon>}
    </div>
  );
}
