import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMe() {
      try {
        const { data } = await axios.get('/api/auth/me');
        setUser(data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  async function login(email, password) {
    const { data } = await axios.post('/api/auth/login', { email, password });
    setUser(data.user);
  }

  async function register(name, email, password) {
    await axios.post('/api/auth/register', { name, email, password });
    // auto-login after register
    await login(email, password);
  }

  async function logout() {
    await axios.post('/api/auth/logout');
    setUser(null);
  }

  const value = { user, loading, login, register, logout };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
