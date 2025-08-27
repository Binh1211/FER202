import { Route, Routes } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import AppNavbar from "../components/NavBar";
import LoginPage from "../pages/LoginPage";
import ProductDetails from "../pages/ProductDetails";
export default function AppRoutes() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}
