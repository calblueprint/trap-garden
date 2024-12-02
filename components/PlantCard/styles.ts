import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const CardContainer = styled.div<{ $isSelected?: boolean }>`
  position: relative;
  width: 168px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 12px;
  background-color: white;
  box-shadow: ${({ $isSelected }) =>
    $isSelected
      ? `
  0 24px 38px 3px rgb(148, 181, 6, 0.14),
  0 9px 46px 8px rgb(148, 181, 6, 0.12),
  0 11px 15px -7px rgb(148, 181, 6, 0.2)`
      : `
  0 24px 38px 3px rgba(0, 0, 0, 0.14),
  0 9px 46px 8px rgba(0, 0, 0, 0.12),
  0 11px 15px -7px rgba(0, 0, 0, 0.2)`};

  border: ${({ $isSelected }) =>
    $isSelected ? `1px solid ${COLORS.sprout}` : '1px solid transparent'};
  backdrop-filter: blur(40px);
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
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px 8px 16px;
  row-gap: 6px;
  width: 100%;
`;

export const PlantAttributes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
`;

export const PlantHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PlantImage = styled.img`
  width: 60px;
  height: 60px;
  font-size: 10px;
`;
