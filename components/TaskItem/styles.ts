import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const TaskWrapper = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ completed }) => (completed ? '#F8FAEA' : '#FFFFFF')};
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const TaskLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const TaskTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TaskTitle = styled.p<{ completed: boolean }>`
  color: ${COLORS.darkgray};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const TaskSubtitle = styled.p<{ completed: boolean }>`
  color: ${COLORS.midgray};
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const TaskCheckbox = styled.div<{ completed: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid #4d7c0f;
  border-radius: 4px;
  background-color: ${({ completed }) =>
    completed ? '#4d7c0f' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
