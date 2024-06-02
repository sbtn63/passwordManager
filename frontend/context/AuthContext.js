import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import axios from "../axios/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://passwordgenerate.pythonanywhere.com/accounts/login/",
        {
          email,
          password,
        }
      );
      const token = res.data.token;
      setUserToken(token);
      await AsyncStorage.setItem("token", token);
      return token;  // Devuelve el token para indicar éxito
    } catch (e) {
      console.log("error login ", e);
      throw e;  // Lanza el error para que pueda ser capturado
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, confirm_password) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://passwordgenerate.pythonanywhere.com/accounts/register/",
        {
          email,
          password,
          confirm_password,
        }
      );
      const token = res.data.token;
      setUserToken(token);
      await AsyncStorage.setItem("token", token);
      return token;  // Devuelve el token para indicar éxito
    } catch (e) {
      console.log("error register ", e);
      throw e;  // Lanza el error para que pueda ser capturado
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUserToken(null);
      await AsyncStorage.removeItem("token");
    } catch (e) {
      console.log("error logout ", e);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      setUserToken(token);
    } catch (error) {
      console.log("isLoggedIn error ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, register }}>
      {children}
    </AuthContext.Provider>
  );
};