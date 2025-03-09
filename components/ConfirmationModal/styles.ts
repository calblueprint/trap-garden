import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  width: 80%;
  max-width: 340px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 28px 32px 20px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 6px 0;
  font-size: 1.125rem;
  font-weight: 400;
  text-align: center;
  font-style: normal;
  font-family: Lexend;
`;

export const ModalMessage = styled.p`
  margin-bottom: 1rem;
  font-size: 0.75rem;
  text-align: center;
  color: ${COLORS.midgray};
  line-height: normal;
  font-weight: 300;
  font-style: ormal;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  justify-content: center;
`;

export const BaseButton = styled.button`
  flex: 1;
  padding: 4px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
`;

export const CancelButton = styled(BaseButton)`
  background-color: ${COLORS.midgray};
  color: white;
  font-family: inherit;
`;

export const ConfirmButton = styled(BaseButton)`
  background-color: ${COLORS.shrub};
  color: white;
  font-family: inherit;
`;
