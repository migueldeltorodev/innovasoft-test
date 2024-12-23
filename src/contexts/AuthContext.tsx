import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthContextType, AuthState, LoginCredentials, RegisterCredentials, User } from '../types/auth.types';
import { authService } from '../services/auth.service';
import { tokenUtils } from '../utils/token.utils';
import axios from 'axios';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const token = tokenUtils.getToken();
    const user = tokenUtils.getUser();
    return {
      isAuthenticated: !!token,
      user,
      token,
    };
  });

  const updateAuthState = useCallback((token: string | null, user: User | null) => {
    setState({
      isAuthenticated: !!token,
      token,
      user,
    });
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (state.token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${state.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [state.token]);

  const login = async (credentials: LoginCredentials, rememberMe: boolean) => {
    try {
      const response = await authService.login(credentials);
      const { token, user } = response;
      if (!token || !user) {
        throw new Error('Login response does not contain token or user.');
      }
      tokenUtils.setToken(token, rememberMe);
      tokenUtils.setUser(user, rememberMe);
      updateAuthState(token, user);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await authService.register(credentials);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = useCallback(() => {
    tokenUtils.removeToken();
    tokenUtils.removeUser();
    updateAuthState(null, null);
  }, [updateAuthState]);

  const value = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    token: state.token,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
