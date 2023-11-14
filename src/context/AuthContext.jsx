import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userLogged, setUserLogged] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const setInfoUser = (data) => {
    setUserLogged({ ...data });
  };

  const userLogout = () => {
    setUserLogged({});
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userLogged, setInfoUser, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
