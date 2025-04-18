'use client';

import { toast } from 'react-toastify';
import { StyledToast, UndoButton } from './style';

interface ToastOptions {
  message: string;
  undo?: boolean;
  undoAction?: () => void;
}

export function showToast({ message, undo, undoAction }: ToastOptions) {
  toast(
    ({ closeToast }) => (
      <StyledToast>
        <span>{message}</span>
        {undo && undoAction && (
          <UndoButton
            onClick={() => {
              undoAction();
              closeToast?.();
            }}
          >
            Undo
          </UndoButton>
        )}
      </StyledToast>
    ),
    {
      closeButton: false,
    },
  );
}
