'use client';

import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, type, duration, onClose }) {
        return (
          <Toast
            id={id}
            type={type}
            duration={duration}
            onClose={onClose}
            title={title}
            description={description}
          />
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
