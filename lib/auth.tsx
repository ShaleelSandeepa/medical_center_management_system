'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { getUserById } from './dummy-data';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const user = getUserById(storedUserId);
      if (user) {
        setUser(user);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('userId', user.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  const authContextValue = { user, login, logout, isLoading };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}