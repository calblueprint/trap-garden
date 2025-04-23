import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P3 } from '@/styles/text';

export const IconWrapper = styled.div`
  background-color: ${COLORS.shrub};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -1.75rem;
  z-index: 1;
  width: 4rem;
  height: 4rem;
`;

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 2rem;
  padding-bottom: 1.5rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const Content = styled.div`
  text-align: center;
  padding-top: 0.25rem;
`;

export const Text = styled(P3)`
  color: #6c6c6c;
  font-size: 0.625rem;
  margin: 0;
`;
