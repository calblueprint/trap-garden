import styled from 'styled-components';

export const SeasonColorKeyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 32px;
  row-gap: 12px;
  width: max-content;
  margin-bottom: 12px;
`;

export const ColorKeyItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  min-width: 108px;
`;

export const ColorCell = styled.div<{ $color: string }>`
  width: 20px;
  height: 8px;
  background-color: ${({ $color }) => $color};
`;
