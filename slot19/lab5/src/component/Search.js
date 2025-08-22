import React from "react";

const Search = ({ search, setSearch }) =>
  (() => {
    const { theme } = require("react").useContext(
      require("../context/ThemeContext").ThemeContext
    );
    return (
      <div style={{ marginBottom: "20px", margin: "0 30vw 0" }}>
        <input
          type="text"
          placeholder="Tìm kiếm món ăn theo tên hoặc mô tả..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
          className={theme === "dark" ? "dark-mode" : ""}
        />
      </div>
    );
  })();

export default Search;
