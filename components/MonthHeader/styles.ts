import styled from 'styled-components';

export const MonthHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 0.75rem;
`;

export const MonthsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.75rem;
  width: 100%;
  justify-items: center;
`;

export const MonthsText = styled.p`
  color: #000;
  font-style: normal;
  font-size: 0.625rem;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

export const WhiteSpace = styled.div`
  min-width: 10%;
  max-width: 10%;
`;
