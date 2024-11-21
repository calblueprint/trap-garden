'use client';

import { DifficultyLevelEnum } from '@/types/schema';
import Icon from '../Icon';

export default function DifficultyLevelBar({
  difficultyLevel,
}: {
  difficultyLevel: DifficultyLevelEnum;
}) {
  if (difficultyLevel === 'EASY') {
    return <Icon type="easy_bar" />;
  } else if (difficultyLevel === 'MODERATE') {
    return <Icon type="moderate_bar" />;
  } else {
    // difficultyLevel === 'HARD'
    return <Icon type="hard_bar" />;
  }
}
