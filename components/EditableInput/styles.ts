import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Label = styled.p`
  color: ${COLORS.shrub};
  font-size: 1rem;
  font-weight: 400;
  margin: 0px;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Keep items left-aligned */
  justify-content: flex-start;
  gap: 6px;
  margin-bottom: 1rem;
  margin-top: 0;
  width: 100%;
  box-sizing: border-box;
`;
