import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const publicFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const usePrivateFetch = () => {
  const { authState } = useContext(AuthContext);

  const privateFetch = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  privateFetch.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${authState.token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return privateFetch;
};

export { publicFetch, usePrivateFetch };
