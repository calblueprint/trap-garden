import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const PageContainer = styled.div`
  width: 100%;
  height: 100svh;
  background-color: ${COLORS.seed};
`;
export const ContentContainer = styled.div`
  display: flex; /* Enable flexbox */
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

export const ButtonContainer = styled.div`
  display: flex; /* Enable flexbox */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Button = styled.button`
  width: 9.375rem;
  height: 3.125rem;
  border-radius: 25rem;
  border-width: 0px;
  background-color: ${COLORS.sprout};
  color: white;
`;
