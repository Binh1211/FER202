import React, { createContext, useState, useEffect, useContext } from "react";
import userApi from "../api/userApi";
import { ToastContext } from "./ToastContext";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { showToast } = useContext(ToastContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (identifier, password) => {
    try {
      const loggedInUser = await userApi.login(identifier, password);
      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const register = async (data) => {
    try {
      const newUser = { ...data, wishlist: [] };
      const res = await userApi.create(newUser);
      return res;
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addToWishlist = async (productId) => {
    if (!user) return;
    if (!user.wishlist.includes(productId)) {
      const updatedUser = { ...user, wishlist: [...user.wishlist, productId] };
      await userApi.update(user.id, updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      showToast("Đã thêm danh sách yêu thích", "success");
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      wishlist: user.wishlist.filter((id) => id !== productId),
    };
    await userApi.update(user.id, updatedUser);
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    showToast("Đã xóa khỏi danh sách yêu thích", "warning");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
