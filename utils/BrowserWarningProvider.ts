'use client';

import { useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ConfirmAlertProps, NavigationPromptProps } from '@/types/schema';

const confirmAlert = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmAlertProps): void => {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
      <div style="background: white; padding: 20px; border-radius: 8px; max-width: 400px;">
        <h2>Alert</h2>
        <p>${message}</p>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button id="confirm">Yes</button>
          <button id="cancel">No</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const confirmButton = modal.querySelector('#confirm');
  const cancelButton = modal.querySelector('#cancel');

  if (confirmButton && cancelButton) {
    confirmButton.addEventListener('click', () => {
      onConfirm();
      document.body.removeChild(modal);
    });

    cancelButton.addEventListener('click', () => {
      onCancel();
      document.body.removeChild(modal);
    });
  }
};

export const useNavigationPrompt = ({
  when,
  message,
}: NavigationPromptProps): void => {
  const router = useRouter();
  const pathname = usePathname();

  const showConfirmDialog = useCallback((): Promise<boolean> => {
    return new Promise(resolve => {
      confirmAlert({
        message,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  }, [message]);

  useEffect(() => {
    const handleBeforeUnload = (
      event: BeforeUnloadEvent,
    ): string | undefined => {
      if (when) {
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    const handleRouteChange = async (url: string): Promise<void> => {
      if (when && url !== pathname) {
        const shouldProceed = await showConfirmDialog();
        if (!shouldProceed) {
          throw new Error('Route Cancelled');
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Type assertion for router.events since it's not fully typed in Next.js
    const events = (router as any).events;
    if (events?.on) {
      events.on('routeChangeStart', handleRouteChange);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (events?.off) {
        events.off('routeChangeStart', handleRouteChange);
      }
    };
  }, [when, message, router, pathname, showConfirmDialog]);
};
