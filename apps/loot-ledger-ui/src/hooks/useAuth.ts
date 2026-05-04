'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  // Adicione outros campos conforme sua API
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        setUser(JSON.parse(userJson));
      } catch (e) {
        console.error('Erro ao parsear usuário do localStorage', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return {
    user,
    isAuthenticated: !!user,
    loading,
    logout,
  };
}
