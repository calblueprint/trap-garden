import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P1 } from '@/styles/text';

export const Container = styled.div`
  padding: 16px;
  background-color: ${COLORS.glimpse};
  border-radius: 5px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const PlantDetailsText = styled(P1)`
  font-weight: 500;
  width: 100%;
  color: ${COLORS.shrub};
`;
