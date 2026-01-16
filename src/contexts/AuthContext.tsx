'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, User, LoginCredentials, RegisterData, AuthContextType } from '@/types/auth';
import { toast } from 'react-toastify';
import { safeLocalStorage } from '@/utils/localStorage';

// Auth Actions
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' };

// Auth Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload !== null,
        isLoading: false
      };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    
    default:
      return state;
  }
}

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount (only on client-side)
  useEffect(() => {
    const loadUser = () => {
      try {
        const userData = safeLocalStorage.getItem('user');
        const token = safeLocalStorage.getItem('token');
        
        if (userData && token) {
          const user = JSON.parse(userData);
          dispatch({ type: 'SET_USER', payload: user });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error loading user:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call - replace with actual API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        // For demo purposes, create a mock user if credentials are correct
        if (credentials.email === 'demo@kuttush.com' && credentials.password === 'demo123') {
          const mockUser: User = {
            id: '1',
            email: credentials.email,
            name: 'Demo User',
            companyName: 'Demo Company',
            phone: '+880123456789',
            role: 'buyer',
            isVerified: true,
            createdAt: new Date().toISOString()
          };
          
          safeLocalStorage.setJSON('user', mockUser);
          safeLocalStorage.setItem('token', 'mock-jwt-token');
          
          dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
          toast.success('Login successful!');
          return;
        }
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      
      // Store user and token
      safeLocalStorage.setJSON('user', data.user);
      safeLocalStorage.setItem('token', data.token);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      toast.success('Login successful!');
      
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Validation
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Simulate API call - replace with actual API endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // For demo purposes, create a mock user
        const mockUser: User = {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
          companyName: data.companyName,
          phone: data.phone,
          role: data.role,
          isVerified: false,
          createdAt: new Date().toISOString()
        };
        
        safeLocalStorage.setJSON('user', mockUser);
        safeLocalStorage.setItem('token', 'mock-jwt-token');
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
        toast.success('Registration successful! Please verify your email.');
        return;
      }

      const responseData = await response.json();
      
      // Store user and token
      safeLocalStorage.setJSON('user', responseData.user);
      safeLocalStorage.setItem('token', responseData.token);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: responseData.user });
      toast.success('Registration successful!');
      
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    safeLocalStorage.removeItem('user');
    safeLocalStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    toast.info('Logged out successfully');
  };

  const value: AuthContextType = {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
