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
  leftText?: string;
  rightText?: string;
  onCancel: () => void;
  onConfirm: () => void;
  flip?: boolean | false;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  leftText,
  rightText,
  onCancel,
  onConfirm,
  flip,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ButtonRow>
          {flip ? (
            <>
              <ConfirmButton onClick={onConfirm}>
                {rightText || 'Exit'}
              </ConfirmButton>
              <CancelButton onClick={onCancel}>
                {leftText || 'Cancel'}
              </CancelButton>{' '}
            </>
          ) : (
            <>
              <CancelButton onClick={onCancel}>
                {leftText || 'Cancel'}
              </CancelButton>
              <ConfirmButton onClick={onConfirm}>
                {rightText || 'Exit'}
              </ConfirmButton>
            </>
          )}
        </ButtonRow>
      </ModalContainer>
    </Overlay>
  );
}
