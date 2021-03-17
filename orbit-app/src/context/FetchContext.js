import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const FetchContext = createContext(null);
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${authState.token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
