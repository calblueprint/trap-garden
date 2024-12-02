'use client';

import { DifficultyLevelEnum } from '@/types/schema';
import Icon from './Icon';

export default function DifficultyLevelBar({
  difficultyLevel,
}: {
  difficultyLevel: DifficultyLevelEnum;
}) {
  if (difficultyLevel === 'EASY') {
    return <Icon type="easyBar" />;
  } else if (difficultyLevel === 'MODERATE') {
    return <Icon type="moderateBar" />;
  } else {
    // difficultyLevel === 'HARD'
    return <Icon type="hardBar" />;
  }
}
