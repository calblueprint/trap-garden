import styled from 'styled-components';
import { SmallRoundedButton } from '@/components/Button';
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

export const HeaderButton = styled.button<{
  $isCurrentMode: boolean;
  $margin: number;
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
  margin-left: ${({ $margin }) => `${$margin}px`};
`;

export const AddButton = styled.button<{ $backgroundColor: string }>`
  position: fixed;

  bottom: 0;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
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
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  /* grid-template-columns: repeat(auto-fill, 168px); */
  gap: 8px;
  max-width: 100%;
  justify-content: center;
`;

export const PlantGridContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SelectButton = styled(SmallRoundedButton)`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 60px;
  height: 25px;
  padding: 0;
  margin-right: 24px;
`;

export const PlantSelection = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PlantSelectionHeaderAllPlants = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 12px;
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
