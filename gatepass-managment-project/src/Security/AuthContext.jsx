import React, { createContext,useContext, useState } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('myAppToken', token);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('myAppToken');
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,authenticate,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
