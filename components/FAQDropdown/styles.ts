import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Question = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

export const Answer = styled.div`
  font-size: 12px;
  font-weight: 300;
`;

export const HorizontalLine = styled.div`
  margin-top: 4px;
  width: 100%;
  height: 0.5px;
  background-color: ${COLORS.lightgray};
`;
