import React, { createContext, useState, useContext } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const loginAdmin = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAdminAuthenticated(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);