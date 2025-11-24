'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, LoginRequest, RegisterRequest } from '@/types/user.types';
import { authService } from '@/services/auth.service';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const profile = await authService.getProfile();
          setUser(profile);
        } else if (!isPublicRoute) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (!isPublicRoute) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [isPublicRoute, router]);

  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    setUser(response.data.user);
    router.push('/');
  };

  const register = async (data: RegisterRequest) => {
    const response = await authService.register(data);
    setUser(response.data);
    router.push('/');
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push('/login');
  };

  const refreshUser = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  // Jangan gunakan early return untuk menghindari hooks mismatch
  const contextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isLoading && !isPublicRoute ? (
        <LoadingSpinner fullScreen text="Memuat..." />
      ) : (
        children
      )}
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
