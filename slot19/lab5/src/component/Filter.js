import React from "react";

const Filter = ({ priceFilter, setPriceFilter }) => {
  const { theme } = require("react").useContext(
    require("../context/ThemeContext").ThemeContext
  );
  return (
    <div style={{ marginBottom: "20px", margin: "0 30vw 20px" }}>
      <select
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
        className={theme === "dark" ? "dark-mode" : ""}
      >
        <option value="">-- Lọc theo giá --</option>
        <option value="low">Dưới 2$</option>
        <option value="mid">Từ 2$ đến 4$</option>
        <option value="high">Trên 4$</option>
      </select>
    </div>
  );
};

export default Filter;
