import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated } from '../login/services/authService';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  // Función para actualizar el estado de autenticación
  const updateAuthStatus = () => {
    const authStatus = isAuthenticated();
    setAuthenticated(authStatus);
  };

  // Función para hacer login (actualizar estado)
  const login = () => {
    setAuthenticated(true);
  };

  // Función para hacer logout (actualizar estado)
  const logout = () => {
    setAuthenticated(false);
  };

  useEffect(() => {
    // Verificar el estado inicial
    updateAuthStatus();

    // Escuchar cambios en localStorage (para tabs múltiples)
    const handleStorageChange = (e) => {
      if (e.key === 'authToken') {
        updateAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value = {
    authenticated,
    login,
    logout,
    updateAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
