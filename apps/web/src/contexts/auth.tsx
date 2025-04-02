import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthResponse, LoginDto, RegisterDto } from 'shared/dto';
import { API_ENDPOINTS, APP_CONSTANTS } from 'shared/constants';
import { AuthBindings } from '@refinedev/core';
import nookies from 'nookies';

type AuthContextType = {
  user: any;
  isLoading: boolean;
  login: (data: LoginDto) => Promise<any>;
  register: (data: RegisterDto) => Promise<any>;
  logout: () => void;
  authProvider: AuthBindings;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = nookies.get(null, APP_CONSTANTS.TOKEN_KEY)?.access_token;
        
        if (token) {
          const { data } = await axios.get(API_ENDPOINTS.AUTH.ME, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          setUser(data.data);
        }
      } catch (error) {
        nookies.destroy(null, APP_CONSTANTS.TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginDto) => {
    try {
      const { data } = await axios.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials,
      );

      setUser(data.user);
      nookies.set(null, APP_CONSTANTS.TOKEN_KEY, data.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || '로그인에 실패했습니다.',
      };
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, data);
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || '회원가입에 실패했습니다.',
      };
    }
  };

  const logout = () => {
    setUser(null);
    nookies.destroy(null, APP_CONSTANTS.TOKEN_KEY);
    router.push('/login');
  };

  const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
      const result = await login({ email, password });
      
      if (result.success) {
        return {
          success: true,
          redirectTo: '/',
        };
      }
      
      return {
        success: false,
        error: {
          message: result.error,
          name: 'LoginError',
        },
      };
    },
    logout: async () => {
      logout();
      return {
        success: true,
        redirectTo: '/login',
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const token = nookies.get(null, APP_CONSTANTS.TOKEN_KEY)?.access_token;
        
        if (token) {
          return {
            authenticated: true,
          };
        }
      } catch (error) {
        return {
          authenticated: false,
          error: new Error('인증 정보를 확인할 수 없습니다.'),
          logout: true,
          redirectTo: '/login',
        };
      }
      
      return {
        authenticated: false,
        error: new Error('인증되지 않았습니다.'),
        logout: true,
        redirectTo: '/login',
      };
    },
    getPermissions: async () => {
      if (user) {
        return user.role;
      }
      return null;
    },
    getIdentity: async () => {
      if (user) {
        return user;
      }
      return null;
    },
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, authProvider }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 