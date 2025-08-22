import React from "react";

const Sort = ({ sortOrder, setSortOrder }) => {
  const { theme } = require("react").useContext(
    require("../context/ThemeContext").ThemeContext
  );
  return (
    <div style={{ marginBottom: "20px", margin: "0 30vw 20px" }}>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
        className={theme === "dark" ? "dark-mode" : ""}
      >
        <option value="">-- Sắp xếp theo giá --</option>
        <option value="asc">Giá thấp đến cao</option>
        <option value="desc">Giá cao đến thấp</option>
      </select>
    </div>
  );
};

export default Sort;
