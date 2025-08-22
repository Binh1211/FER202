import { CartProvider } from "./context/CartContext";
import DishesList from "./component/DishesList";
import Cart from "./component/Cart";
import "./App.css";
import Search from "./component/Search";
import { useState } from "react";

// Sample dishes array
const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CartProvider>
      <div className={`App ${darkMode ? "dark-mode" : ""}`}>
        <div className="d-flex justify-content-end p-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? "Chế độ Sáng" : "Chế độ Tối"}
          </button>
        </div>
        <Search search={search} setSearch={setSearch} />
        <DishesList darkMode={darkMode} dishes={filteredDishes} />
        <Cart darkMode={darkMode} />
      </div>
    </CartProvider>
  );
}

export default App;
