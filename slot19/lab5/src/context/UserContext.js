import React, { createContext, useState } from "react";
import users from "../data/user";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const foundUser = users.find(
      (user) => user.username === username && user.passWord === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
