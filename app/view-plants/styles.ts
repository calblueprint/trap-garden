import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const TopRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const HeaderButton = styled.button<{ $isCurrentMode: boolean }>`
  background: none;
  border: none;
  color: ${COLORS.shrub};
  font-family: inherit;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ $isCurrentMode }) =>
    $isCurrentMode ? ` ${COLORS.shrub}` : `${COLORS.midgray}`};
  text-decoration: ${({ $isCurrentMode }) =>
    $isCurrentMode ? ` underline ` : `none`};
`;
export const AddButton = styled.button`
  position: fixed;

  bottom: 0;
  background-color: ${COLORS.shrub};
  color: white;
  border-radius: 20px;
  border: none;
  font-family: inherit;
  margin-bottom: 10px;
  width: 170px;
  height: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const PlantGridView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 168px);
  gap: 8px;
  max-width: 100%;
  justify-content: center;
`;
export const PlantGridContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
