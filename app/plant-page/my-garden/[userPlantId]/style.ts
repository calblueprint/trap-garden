import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P3 } from '@/styles/text';

// only for UserPlantPage
export const RemoveButton = styled.button`
  background-color: ${COLORS.shrub};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.75rem;
  font-style: inherit;
  font-weight: 400;
  line-height: normal;
`;

// Only for UserPlantPage
export const Subtitle = styled(P3)`
  font-style: italic;
  font-weight: 400;
  color: ${COLORS.shrub};
`;
