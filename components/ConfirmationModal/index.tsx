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
  leftText?: string | 'Cancel';
  rightText?: string | 'Exit';
  onCancel: () => void;
  onConfirm: () => void;
  flipButtons?: boolean | false;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  leftText = 'Cancel',
  rightText = 'Exit',
  onCancel,
  onConfirm,
  flipButtons,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ButtonRow>
          {flipButtons ? (
            <>
              <ConfirmButton onClick={onConfirm}>{rightText}</ConfirmButton>
              <CancelButton onClick={onCancel}>{leftText}</CancelButton>{' '}
            </>
          ) : (
            <>
              <CancelButton onClick={onCancel}>{leftText}</CancelButton>
              <ConfirmButton onClick={onConfirm}>{rightText}</ConfirmButton>
            </>
          )}
        </ButtonRow>
      </ModalContainer>
    </Overlay>
  );
}
