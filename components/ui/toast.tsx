'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { createContext, useContext } from 'react';

// Export the ToastProps interface
export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

// Add ToastActionElement type
export type ToastActionElement = React.ReactElement<any>;

export function Toast({ id, type, title, description, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const borderColors = {
    success: 'border-green-500',
    error: 'border-red-500',
    info: 'border-blue-500'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className={`bg-white border-l-4 ${borderColors[type]} p-4 rounded-lg shadow-lg max-w-md`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {icons[type]}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{title}</p>
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(id), 300);
              }}
              className="ml-4 inline-flex text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <div className="fixed top-0 right-0 z-50 p-4 space-y-2">{children}</div>;
}

export function ToastViewport() {
  return null; // This is handled by ToastProvider positioning
}

export function ToastTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-gray-900">{children}</p>;
}

export function ToastDescription({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-gray-500">{children}</p>;
}

export function ToastClose({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="ml-4 inline-flex text-gray-400 hover:text-gray-600"
    >
      <X className="w-4 h-4" />
    </button>
  );
}