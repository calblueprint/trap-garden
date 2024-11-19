import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${COLORS.seed};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const ReviewContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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

export const H3 = styled.p`
  color: ${COLORS.shrub};
  font-size: 1.5rem;
`;
