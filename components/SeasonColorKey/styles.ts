import styled from 'styled-components';

export const SeasonColorKeyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 2rem;
  row-gap: 0.75rem;
  width: 244px;
  justify-self: center;
  margin-bottom: 12px;
`;

export const ColorKeyItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  align-items: center;
  min-width: 108px;
`;

export const ColorCell = styled.div<{ $color: string }>`
  width: 20px;
  height: 8px;
  background-color: ${({ $color }) => $color};
`;
