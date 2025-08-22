import React, { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";
import DishesList from "./DishesList";
import { ThemeContext } from "../context/ThemeContext";

const MyFavourites = () => {
  const { favouriteItems = [] } = useContext(FavouriteContext); // fallback []
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`App ${theme === "dark" ? "dark-mode" : ""}`}
      style={{ height: "92vh" }}
    >
      {favouriteItems.length === 0 ? (
        <p className="text-center pt-4">Bạn chưa có món yêu thích nào.</p>
      ) : (
        <DishesList dishes={favouriteItems} darkMode={theme === "dark"} />
      )}
    </div>
  );
};

export default MyFavourites;
