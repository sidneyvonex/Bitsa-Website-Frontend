import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'Student' | 'Admin' | 'SuperAdmin';
  schoolId?: string;
  major?: string;
  avatar?: string;
  isEmailVerified?: boolean;
  hasSelectedInterests?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// Helper to get user from localStorage
const getStoredUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('token') && !!getStoredUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        refreshToken?: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }

      // Store both token and user data
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Clear all auth-related data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;


export const authReducer = authSlice.reducer;


export const selectCurrentUser = (state: RootState) => (state.auth as AuthState).user;
export const selectCurrentToken = (state: RootState) => (state.auth as AuthState).token;
export const selectIsAuthenticated = (state: RootState) => (state.auth as AuthState).isAuthenticated;