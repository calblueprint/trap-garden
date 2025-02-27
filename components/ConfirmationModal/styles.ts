import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* ensure it's above other elements */
`;

export const ModalContainer = styled.div`
  width: 80%;
  max-width: 340px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const ModalMessage = styled.p`
  margin: 0 0 24px 0;
  font-size: 14px;
  text-align: center;
  color: #444;
  line-height: 1.4;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
`;

export const BaseButton = styled.button`
  flex: 1;
  width: 76px;
  padding: 5px 25px;
  justify-content: center;
  align-items: center;
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
