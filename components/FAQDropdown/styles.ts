import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Question = styled.div`
  color: var(--dark-black, #222);
  font-family: Lexend;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Answer = styled.div`
  color: var(--dark-black, #222);
  font-family: Lexend;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const HorizontalLine = styled.div`
  margin-top: 4px;
  width: 100%;
  height: 0.03125rem;
  background-color: ${COLORS.lightgray};
`;
