import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Error al verificar el token de autenticación", error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const signIn = async (token) => {
    try {
      await AsyncStorage.setItem("authToken", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error al almacenar el token de autenticación", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
