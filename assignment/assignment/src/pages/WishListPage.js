import { useState, useContext, useEffect } from "react";
import ProductList from "../components/ProductList";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";

export default function WishListPage() {
  const { products } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const [wishListProducts, setWishListProducts] = useState([]);

  useEffect(() => {
    if (!user || !products) {
      setWishListProducts([]);
      return;
    }

    const wishlistIds = user.wishlist || []; // lưu ý đúng tên 'wishlist'
    const filteredProducts = products.filter((product) =>
      wishlistIds.includes(product.id)
    );

    setWishListProducts(filteredProducts);
  }, [products, user]);

  return (
    <div className="mt-4">
      <h2 className="mb-4 text-center fw-bold">Danh sách sản phẩm yêu thích</h2>
      {wishListProducts.length > 0 ? (
        <ProductList products={wishListProducts} />
      ) : (
        <p className="text-center text-muted">
          Chưa có sản phẩm yêu thích nào.
        </p>
      )}
    </div>
  );
}
