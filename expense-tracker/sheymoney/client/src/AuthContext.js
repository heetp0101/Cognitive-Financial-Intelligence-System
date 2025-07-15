// AuthContext.js

import React, { createContext, useContext, useReducer } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

const initialState = {
    type:'LOGIN',
    isAuthenticated: true,
    user: null,
    redirectToLogin: true, // Add this state
};

const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        if (state.isAuthenticated) {
          // User is already logged in, do not allow logging in again

          return <Navigate to={'/'}/>;
        }
        return {
          isAuthenticated: true,
          user: action.payload,
        };
      case 'LOGOUT':
        return {
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
};

export const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
