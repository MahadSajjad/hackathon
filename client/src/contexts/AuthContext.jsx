import React, { createContext, useContext, useState, useEffect } from 'react';
import mockAPI from '../services/mockApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      try {
        const currentUser = await mockAPI.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const { user, token } = await mockAPI.login(credentials);
      setUser(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { user, token } = await mockAPI.register(userData);
      setUser(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await mockAPI.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isDonor: user?.role === 'donor',
    isNGO: user?.role === 'ngo',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
