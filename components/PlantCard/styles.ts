import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Card = styled.div<{ isSelected?: boolean }>`
  position: relative;
  height: 40vh;
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 12px;
  background-color: white;
  box-shadow:
    0 24px 38px 3px rgba(0, 0, 0, 0.14),
    0 9px 46px 8px rgba(0, 0, 0, 0.12),
    0 11px 15px -7px rgba(0, 0, 0, 0.2);

  border: ${({ isSelected }) =>
    isSelected ? `1px solid ${COLORS.sprout}` : 'none'};
`;

export const CardPic = styled.div`
  height: 60%;
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
  padding-left: 1vw;
  height: 40%;
  row-gap: 1vh;

  > * {
    margin: 0;
  }

  > h2 {
    font-size: 1rem;
    margin-top: 1vh;
  }
`;

export const PlantAttributes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

export const Attribute = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    margin: 0;
    font-size: 0.625rem;
  }
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
