import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Question = styled.div`
  font-weight: 500;
  font-size: 14px;
  font-family: 'AirbnbCereal_W_Md', sans-serif;
  line-height: normal;
`;

export const Answer = styled.div`
  font-size: 12px;
  font-weight: 300;
  font-family: 'AirbnbCereal_W_Lt', sans-serif;
`;

export const HorizontalLine = styled.div`
  margin-top: 4px;
  width: 100%;
  height: 0.5px;
  background-color: ${COLORS.lightgray};
`;

export const Dropdown = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
