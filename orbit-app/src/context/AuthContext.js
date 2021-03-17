import React, { createContext, useState } from "react";
import { useHistory } from "react-router";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [authState, setAuthState] = useState(() => ({
    token: localStorage.getItem("token") || null,
    expiresAt: localStorage.getItem("expiresAt") || null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
  }));

  const setAuthInfo = ({ token, expiresAt, userInfo }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);
    setAuthState({ token, expiresAt, userInfo });
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) return false;
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const logout = () => {
    setAuthState({ token: null, expiresAt: null, userInfo: {} });
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiresAt");
    history.push("/");
  };

  const isAdmin = () => {
    return authState.userInfo.role === "admin";
  };

  return (
    <Provider
      value={{
        authState,
        setAuthInfo,
        isAuthenticated,
        logout,
        isAdmin,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
