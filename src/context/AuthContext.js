import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      if (data.token) {
        setToken(data.token);
        setUser({ email }); // In a real app, you might get more user data from the response
        return true;
      }
      throw new Error(data.message || 'Login failed');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // Here you would also clear any stored token from AsyncStorage
  };

  const authContextValue = {
    user,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};