import styled from 'styled-components';
import { device } from '@/styles/breakpoints';
import COLORS from '@/styles/colors';
import { P1 } from '@/styles/text';

export const CardContainer = styled.div<{ $isSelected?: boolean }>`
  position: relative;
  width: 100%; // let PlantGridContainer handle sizing
  // max-width: 168px; // if PlantCard were used independently
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 12px;
  background-color: white;
  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.05);

  border: ${({ $isSelected }) =>
    $isSelected ? `1px solid ${COLORS.sprout}` : '1px solid transparent'};
  backdrop-filter: blur(40px);

  &:hover {
    cursor: pointer;
    //TODO: add hover effect to show highlighted card
  }

  @media ${device.lg} {
    height: 300px;
    border: ${({ $isSelected }) =>
      $isSelected ? `2px solid ${COLORS.sprout}` : 'none'};
  }
`;

export const CardPic = styled.div`
  height: 92px;
  width: 100%;
  background-color: #f5f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  @media ${device.lg} {
    height: 150px;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px 8px 16px;
  row-gap: 6px;
  width: 100%;

  @media ${device.lg} {
    padding: 12px 16px 20px 20px;
`;

export const PlantAttributes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media ${device.lg} {
    gap: 8px;
  }
`;

export const Attribute = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const RoundCheck = styled.input.attrs({ type: 'checkbox' })`
  width: 1.3em;
  height: 1.3em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #95b509;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #95b509;
  }

  &:checked::before {
    content: '✓';
    color: white;
    font-size: 0.9em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const TopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 10px;
`;

export const AttributeContent = styled.p`
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin: 0;

  @media ${device.lg} {
    font-size: 14px;
  }
`;

export const PlantHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media ${device.lg} {
    margin-bottom: 6px;
  }
`;

export const PlantImage = styled.img`
  width: 75px;
  height: 75px;
  font-size: 10px;

  @media ${device.lg} {
    width: 105px;
    height: 105px;
  }
`;

export const ResponsiveP1 = styled(P1)`
  @media ${device.lg} {
    font-size: 20px;
  }
`;
