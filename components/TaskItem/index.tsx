// TaskItem.tsx
import React from 'react';
// adjust the path as needed
import Icon from '@/components/Icon'; // adjust the import path accordingly
import {
  TaskCheckbox,
  TaskLeftSection,
  TaskSubtitle,
  TaskTextContainer,
  TaskTitle,
  TaskWrapper,
} from './styles';

// Helper to format a Date into a string (e.g., "Mar 6")
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

interface TaskItemProps {
  type: 'water' | 'weed' | 'harvest';
  plantName: string;
  completed: boolean;
  dueDate: Date | string;
  onToggle: () => void;
}

export default function TaskItem({
  type,
  plantName,
  completed,
  dueDate,
  onToggle,
}: TaskItemProps) {
  const iconType =
    type === 'water'
      ? 'bigCan'
      : type === 'weed'
        ? 'spade'
        : 'harvestingBasket';
  return (
    <TaskWrapper completed={completed}>
      <TaskLeftSection>
        <Icon type={iconType} />

        <TaskTextContainer>
          <TaskTitle completed={completed}>
            {type.charAt(0).toUpperCase() + type.slice(1)} {plantName}
          </TaskTitle>

          <TaskSubtitle completed={completed}>
            {typeof dueDate === 'string'
              ? dueDate.substring(0, 1).toUpperCase() +
                dueDate.substring(1).toLowerCase()
              : 'Due ' + formatDate(dueDate)}
          </TaskSubtitle>
        </TaskTextContainer>
      </TaskLeftSection>

      <TaskCheckbox completed={completed} onClick={onToggle}></TaskCheckbox>
    </TaskWrapper>
  );
}
