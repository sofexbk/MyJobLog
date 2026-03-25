'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/app/types';
import { getToken, decodeToken, isAuthenticated } from '@/app/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  checkAuth: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(() => {
    const token = getToken();
    if (token && isAuthenticated()) {
      const decoded = decodeToken(token);
      setUser(decoded);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);

      checkAuth(); 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(checkAuth, 0);
    return () => clearTimeout(timeout);
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
