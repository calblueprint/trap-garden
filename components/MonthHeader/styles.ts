import styled from 'styled-components';

export const MonthHeaderContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 12fr;
  gap: 12px;
`;

export const MonthsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
  justify-items: center;
`;

export const MonthsText = styled.text`
  color: #000;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
