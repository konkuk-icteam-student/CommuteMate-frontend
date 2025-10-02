import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@repo/shared-types';
import { getStoredToken, removeStoredToken } from './api/token.api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기 로드 시 저장된 토큰으로 사용자 정보 복원
    const initAuth = async () => {
      const token = getStoredToken();
      if (token) {
        // TODO: 토큰으로 사용자 정보 가져오기
        // const user = await fetchUserFromToken(token);
        // setUser(user);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem('accessToken', token);
    setUser(userData);
  };

  const logout = () => {
    removeStoredToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
