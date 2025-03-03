import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Card = styled.div`
  background-color: white;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 24px;
  height: 109px;
`;

export const Title = styled.h2`
  color: ${COLORS.shrub};
  font-family: Lexend;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-bottom: 6px;
  text-align: center;
`;

export const Text = styled.p`
  color: ${COLORS.midgray};
  font-family: Lexend;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-bottom: 6px;
`;
