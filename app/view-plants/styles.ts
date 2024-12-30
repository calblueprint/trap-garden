import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 20px;
  align-items: center;
  overflow-x: auto;
`;

export const TopRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
  padding-right: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderButton = styled.button<{
  $isCurrentMode: boolean;
}>`
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

export const AddButtonContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  margin-bottom: 10px;
`;

export const PlantGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  /* grid-template-columns: repeat(auto-fill, 168px); */
  gap: 8px;
  max-width: 100%;
  justify-content: center;
`;

export const ViewSelection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const NumberSelectedPlantsContainer = styled.div`
  background-color: ${COLORS.shrub};
  text-align: center;
  width: 100%;
  height: 16px;
  padding: 0;
`;

export const NumberSelectedPlants = styled.p`
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: #fff;
`;

export const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
`;
