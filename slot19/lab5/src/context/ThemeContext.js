import React, { createContext, useState, useContext } from "react";

// 1. Tạo Context
export const ThemeContext = createContext();

// 2. Tạo Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
