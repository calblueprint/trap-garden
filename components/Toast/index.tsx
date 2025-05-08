'use client';

import { toast } from 'react-toastify';
import { Flex } from '@/styles/containers';
import { P2 } from '@/styles/text';
import { GreenDiv, StyledToast, UndoButton } from './style';

interface ToastOptions {
  message: string;
  undo?: boolean;
  undoAction?: () => void;
}

export function showToast({ message, undo, undoAction }: ToastOptions) {
  toast(
    ({ closeToast }) => (
      <Flex $direction="row">
        <GreenDiv />
        <StyledToast>
          <P2>{message}</P2>
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
      </Flex>
    ),
    {
      closeButton: false,
    },
  );
}
