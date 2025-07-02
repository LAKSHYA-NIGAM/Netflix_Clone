import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  addToMyList: (movieId: string) => void;
  removeFromMyList: (movieId: string) => void;
  updateContinueWatching: (movieId: string, progress: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, user: action.payload, error: null };
    case 'LOGIN_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, error: null };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem('netflix_user');
    if (storedUser) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(storedUser) });
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        const user: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          myList: [],
          continueWatching: []
        };
        localStorage.setItem('netflix_user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid credentials' });
      }
    }, 1000);
  };

  const signup = async (email: string, password: string, name: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call
    setTimeout(() => {
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        myList: [],
        continueWatching: []
      };
      localStorage.setItem('netflix_user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem('netflix_user');
    dispatch({ type: 'LOGOUT' });
  };

  const addToMyList = (movieId: string) => {
    if (state.user) {
      const updatedUser = {
        ...state.user,
        myList: [...state.user.myList, movieId]
      };
      localStorage.setItem('netflix_user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    }
  };

  const removeFromMyList = (movieId: string) => {
    if (state.user) {
      const updatedUser = {
        ...state.user,
        myList: state.user.myList.filter(id => id !== movieId)
      };
      localStorage.setItem('netflix_user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    }
  };

  const updateContinueWatching = (movieId: string, progress: number) => {
    if (state.user) {
      const existingIndex = state.user.continueWatching.findIndex(
        item => item.movieId === movieId
      );
      
      let continueWatching = [...state.user.continueWatching];
      
      if (existingIndex >= 0) {
        continueWatching[existingIndex] = {
          movieId,
          progress,
          lastWatched: new Date().toISOString()
        };
      } else {
        continueWatching.push({
          movieId,
          progress,
          lastWatched: new Date().toISOString()
        });
      }

      const updatedUser = {
        ...state.user,
        continueWatching
      };
      localStorage.setItem('netflix_user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        addToMyList,
        removeFromMyList,
        updateContinueWatching
      }}
    >
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