// src/api/productApi.js
import { productClient } from "./axiosClient";

const productApi = {
  getAll: () => productClient.get("/products"),
  getById: (id) => productClient.get(`/products/${id}`),
  getByBrand: (brand) => productClient.get(`/products?name=${brand}`),
  getByTag: (tag) => productClient.get(`/products?tags_like=${tag}`),
  search: (keyword) => productClient.get(`/products?title_like=${keyword}`),
  create: (data) => productClient.post("/products", data),
  update: (id, data) => productClient.put(`/products/${id}`, data),
  delete: (id) => productClient.delete(`/products/${id}`),
};

export default productApi;
