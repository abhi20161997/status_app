import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, signupRequest, verifyTokenRequest } from "../api/auth";
import { AuthContextType, User } from "../types";
import {
  getAccessToken,
  removeTokens,
  setAccessToken,
  setRefreshToken,
} from "../utils/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          await verifyToken(token);
        } catch (error) {
          console.error("Token verification failed:", error);
          logout();
        }
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await verifyTokenRequest(token);
      setIsAuthenticated(true);
      setUser(response.data.user_data);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await loginRequest(username, password);
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      setIsAuthenticated(true);
      setUser(response.data.user_data);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await signupRequest(username, email, password);
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      setIsAuthenticated(true);
      setUser(response.data.user_data);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = () => {
    removeTokens();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
