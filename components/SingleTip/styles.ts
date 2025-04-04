import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P2 } from '@/styles/text';

export const Card = styled.div`
  background: #f4f8e6;
  border-radius: 10px;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  flex: 1;
`;

export const Title = styled(P2)`
  font-size: 14px;
  font-weight: 300;
  color: ${COLORS.shrub};
  margin-bottom: 2px;
`;

export const Text = styled.p`
  font-size: 10px;
  font-weight: 300;
  color: ${COLORS.midgray};
`;
