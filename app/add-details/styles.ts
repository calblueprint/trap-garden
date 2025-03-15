import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const FooterButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 24px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  &:has(:only-child) {
    justify-content: flex-end;
  }
`;

export const ReviewDetailsContainer = styled.div`
  padding: 24px;
  padding-top: 32px;
  border-radius: 5px;
  border: 1px solid ${COLORS.lightgray};
  width: 100%;
`;

export const ReviewGrid = styled.div`
  display: grid;
  column-gap: 8px;
  row-gap: 4px;
  grid-template-columns: auto 1fr;
`;
