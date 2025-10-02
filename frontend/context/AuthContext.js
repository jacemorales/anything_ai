import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { login as apiLogin, signup as apiSignup } from '../utils/api';

const TOKEN_KEY = 'auth_token';
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await getItemAsync(TOKEN_KEY);
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (e) {
        console.error("Failed to load token from storage", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  useEffect(() => {
    if (isLoading) return; // Don't run this effect until the token is loaded

    const inAuthGroup = segments[0] === '(auth)';

    if (token && inAuthGroup) {
      router.replace('/home');
    } else if (!token && !inAuthGroup) {
      router.replace('/login');
    }
  }, [token, segments, isLoading]);

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      if (data.token) {
        setToken(data.token);
        setUser({ email });
        await setItemAsync(TOKEN_KEY, data.token);
        return true;
      }
      throw new Error(data.message || 'Login failed');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      const data = await apiSignup(email, password);
      if (data.user) {
        return true;
      }
      throw new Error(data.message || 'Signup failed');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await deleteItemAsync(TOKEN_KEY);
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};