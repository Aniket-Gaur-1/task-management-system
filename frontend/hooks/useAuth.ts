'use client';

import { useEffect, useState } from 'react';

interface StorageValue {
  accessToken?: string;
  refreshToken?: string;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<StorageValue | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    setAuth({
      accessToken: accessToken || undefined,
      refreshToken: refreshToken || undefined,
    });
    setIsLoading(false);
  }, []);

  const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAuth({ accessToken, refreshToken });
  };

  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth({ accessToken: undefined, refreshToken: undefined });
  };

  return {
    isAuthenticated: !!auth?.accessToken,
    isLoading,
    setTokens,
    clearTokens,
  };
};
