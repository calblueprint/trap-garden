import React from 'react';
import {
  ButtonRow,
  CancelButton,
  ConfirmButton,
  ModalContainer,
  ModalMessage,
  ModalTitle,
  Overlay,
} from './styles';

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ButtonRow>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>Exit</ConfirmButton>
        </ButtonRow>
      </ModalContainer>
    </Overlay>
  );
}

/* ----- Styled Components ----- */
