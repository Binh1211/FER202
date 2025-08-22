import React, { createContext, useReducer, useContext } from "react";
import { ToastContext } from "./ToastContext"; // để dùng showToast

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const { showToast } = useContext(ToastContext);
  const [favouriteItems, favouriteDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_TO_FAVOURITES":
        return [...state, action.payload];
      case "REMOVE_FROM_FAVOURITES":
        return state.filter((item) => item.id !== action.payload);
      default:
        return state;
    }
  }, []);

  const addToFavourites = (dish) => {
    favouriteDispatch({ type: "ADD_TO_FAVOURITES", payload: dish });
    showToast("Đã thêm vào danh sách yêu thích!", "success");
  };

  const removeFromFavourites = (id) => {
    favouriteDispatch({ type: "REMOVE_FROM_FAVOURITES", payload: id });
    showToast("Đã xóa khỏi danh sách yêu thích!", "info");
  };

  return (
    <FavouriteContext.Provider
      value={{ favouriteItems, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
