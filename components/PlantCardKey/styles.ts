import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const PlantCardKeyContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  background-color: white;
  border: none;
  margin-top: 16px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%); // center PlantCardKey with button above it
  z-index: 1000;
  min-width: 168px;
  min-height: 200px;
  width: max-content;

  // creates triangle pointer above plant card key
  &::before {
    content: '';
    width: 0;
    height: 0;
    left: 50%;
    top: -10px;
    transform: translateX(-50%);
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${COLORS.shrub};
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.shrub};
  border-radius: 12px 12px 0px 0px;
  color: white;
  padding: 8px 0px;
  border: none;
`;

export const DifficultyLevelsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
`;

export const HorizontalLine = styled.div`
  margin-top: 4px;
  width: 100%;
  height: 1px;
  background-color: ${COLORS.lightgray};
`;

export const IconKeyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
