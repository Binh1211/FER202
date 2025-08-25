import { useContext, useState, useMemo } from "react";
import Carousels from "../components/Carousels";
import ProductList from "../components/ProductList";
import { ProductContext } from "../context/ProductContext";
import NavbarFilter from "../components/NavbarFilter";

export default function HomePage() {
  const { products } = useContext(ProductContext);
  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    hot: false,
    sale: false,
    priceRange: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const { search, brand, hot, sale, priceRange } = filters;

      // Search (title)
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      // Brand
      if (brand && p.name !== brand) {
        return false;
      }

      // Hot filter
      if (hot && !p.tags.includes("hot")) {
        return false;
      }

      // Sale filter
      if (sale && !p.tags.includes("sale")) {
        return false;
      }

      // Price filter
      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        if (max) {
          if ((p.salePrice || p.price) < min || (p.salePrice || p.price) > max)
            return false;
        } else {
          if ((p.salePrice || p.price) < min) return false;
        }
      }

      return true;
    });
  }, [products, filters]);

  return (
    <div>
      <Carousels />
      <div className="mt-4">
        <h2 className="mb-4 text-center fw-bold">Danh sách sản phẩm</h2>
        <NavbarFilter onFilterChange={setFilters} />
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
