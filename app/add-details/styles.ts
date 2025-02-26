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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalText = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const ModalButton = styled.button<{ primary?: boolean }>`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  background: ${({ primary }) => (primary ? '#ff5252' : '#ccc')};
  color: ${({ primary }) => (primary ? 'white' : 'black')};
  &:hover {
    opacity: 0.8;
  }
`;
