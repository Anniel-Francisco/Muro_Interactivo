import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userLogged, setUserLogged] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);

    localStorage.setItem("login", JSON.stringify({ logged: true }));
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.setItem("login", JSON.stringify({ logged: false }));
  };

  const setInfoUser = (data) => {
    setUserLogged({ ...data });
    localStorage.setItem(
      "userLogged",
      JSON.stringify({ userInfo: { ...data } })
    );
  };

  const userLogout = () => {
    setUserLogged({});
    localStorage.setItem("userLogged", JSON.stringify({ userInfo: {} }));
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userLogged, setInfoUser, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
