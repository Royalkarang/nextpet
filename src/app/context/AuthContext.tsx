"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AuthContextType {
  isAuthenticated: boolean;
  isBreederAuthenticated: boolean;
  login: (token: Token) => void;
  logout: () => void;
}

interface Token {
  type: 'user-type' | 'breeder-admin-type';
  user_id: string; // Assuming user_id is part of the token
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isBreederAuthenticated, setIsBreederAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
  
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
  
        // Check the 'type' of the token to set the authentication states
        if (parsedToken.type === 'user-type') {
          setIsAuthenticated(true); 
          setIsBreederAuthenticated(false); 
          localStorage.removeItem('breeder_user_id')
          if (isBreederAuthenticated){
            toast.success('Breeder Logout Successfully')
          }
        } else if (parsedToken.type === 'breeder-admin-type') {
          setIsAuthenticated(false);
          setIsBreederAuthenticated(true); 
          localStorage.removeItem('user_user_id')
          if (isAuthenticated){
            toast.success('User Logout Successfully')
          }
        } else {
          // In case the token type is unknown or invalid, reset authentication states
          setIsAuthenticated(false);
          setIsBreederAuthenticated(false);
        }
      } catch (error) {
        // Handle any errors during parsing
        console.error("Failed to parse token from localStorage", error);
        setIsAuthenticated(false);
        setIsBreederAuthenticated(false);
      }
    } else {
      // If no token found in localStorage, reset authentication states
      setIsAuthenticated(false);
      setIsBreederAuthenticated(false);
    }
  }, [isAuthenticated, isBreederAuthenticated]);

  const login = (token: Token) => {
    // localStorage.setItem("authToken", token);
    localStorage.setItem("authToken", JSON.stringify(token));

    if(token.type == 'user-type') {
      setIsAuthenticated(true);
    } else if(token.type == 'breeder-admin-type'){
      setIsBreederAuthenticated(true);
    }
    router.push("/user/sign-in");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("user_user_id");
    localStorage.removeItem("breeder_user_id");
    setIsAuthenticated(false);
    // router.push("/");
    window.location.href = "/user/sign-in";
  };

  // if (isAuthenticated === null) {
  //   // While we're determining the authentication status, show a loading state
  //   setIsAuthenticated(true);
  // }

  return (
    // <AuthContext.Provider value={{ isAuthenticated, isBreederAuthenticated, login, logout }}>
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticated ?? false, isBreederAuthenticated: isBreederAuthenticated ?? false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
``;
