import React, { createContext, useState, useEffect } from "react";
import productApi from "../api/productApi";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy tất cả sản phẩm
  const fetchProducts = async () => {
    setLoading(true);
    const res = await productApi.getAll();
    setProducts(res.data);
    setLoading(false);
  };

  // Lấy sản phẩm theo id
  const getProductById = async (id) => {
    const res = await productApi.getById(id);
    return res.data;
  };

  // Thêm sản phẩm
  const addProduct = async (data) => {
    const res = await productApi.create(data);
    setProducts((prev) => [...prev, res.data]);
    return res.data;
  };

  // Cập nhật sản phẩm
  const updateProduct = async (id, data) => {
    const res = await productApi.update(id, data);
    setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
    return res.data;
  };

  // Xóa sản phẩm
  const deleteProduct = async (id) => {
    await productApi.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Load lần đầu
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
