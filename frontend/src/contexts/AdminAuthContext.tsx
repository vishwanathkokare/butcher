import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem("authToken");
    return !!token;
  });

  const login = async (password: string) => {
    try {
      const response = await axios.post("/api/v1/admin/login", { password });
      console.log(response.data);
      localStorage.removeItem("authToken");
      localStorage.setItem("authToken", response.data.token); // Store token in localStorage
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AuthProvider");
  }
  return context;
};