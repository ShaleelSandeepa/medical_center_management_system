'use client';

import { useAuth } from '@/lib/auth';
import { useStore } from '@/lib/store';
import { Sidebar } from './sidebar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useEffect } from 'react';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const { theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null; // This will be handled by the auth redirect
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}