import DishesList from "../component/DishesList";
import "../App.css";
import Search from "../component/Search";
import { useState, useMemo } from "react";
import dishes from "../data/dishes";
import Carousels from "../component/Carousels";
import Sort from "../component/Sort";
import Filter from "../component/Filter";
import ToastMessage from "../component/ToastMessage";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function HomePage() {
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // useMemo để tối ưu search + filter + sort
  const filteredDishes = useMemo(() => {
    let result = dishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(search.toLowerCase()) ||
        dish.description.toLowerCase().includes(search.toLowerCase())
    );

    // Lọc theo giá
    if (priceFilter === "low") {
      result = result.filter((dish) => dish.price < 2);
    } else if (priceFilter === "mid") {
      result = result.filter((dish) => dish.price >= 2 && dish.price <= 4);
    } else if (priceFilter === "high") {
      result = result.filter((dish) => dish.price > 4);
    }

    // Sắp xếp theo giá
    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, sortOrder, priceFilter]);

  return (
    <>
      <Carousels />
      <div className={`App ${theme === "dark" ? "dark-mode" : ""} pt-4 pb-4`}>
        <Filter priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
        <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <Search search={search} setSearch={setSearch} />

        <DishesList darkMode={theme === "dark"} dishes={filteredDishes} />
      </div>
      <ToastMessage />
    </>
  );
}

export default HomePage;
