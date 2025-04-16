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
  type: 'water' | 'weed';
  plantName: string;
  completed: boolean;
  dueDate: Date;
  onToggle: () => void;
}

export default function TaskItem({
  type,
  plantName,
  completed,
  dueDate,
  onToggle,
}: TaskItemProps) {
  return (
    <TaskWrapper completed={completed}>
      <TaskLeftSection>
        <Icon type={type === 'water' ? 'bigCan' : 'spade'} />

        <TaskTextContainer>
          <TaskTitle completed={completed}>
            {type.charAt(0).toUpperCase() + type.slice(1)} {plantName}
          </TaskTitle>

          <TaskSubtitle completed={completed}>
            Due {formatDate(dueDate)}
          </TaskSubtitle>
        </TaskTextContainer>
      </TaskLeftSection>

      <TaskCheckbox completed={completed} onClick={onToggle}></TaskCheckbox>
    </TaskWrapper>
  );
}
