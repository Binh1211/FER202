import { UserProvider } from "../context/UserContext";
import { ProductProvider } from "../context/ProductContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../context/ToastContext";
import ToastMessage from "../components/ToastMessage";
import Footer from "../components/Footer";
import WishListPage from "../pages/WishListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

function MyRouters() {
  return (
    <ToastProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <AppNavbar />
              <div style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute rolesAllowed={["user", "admin"]}>
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute rolesAllowed={["user", "admin"]}>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <ProtectedRoute rolesAllowed={["user", "admin"]}>
                        <WishListPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute rolesAllowed={["user", "admin"]}>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <h3 className="text-center mt-4">404 Not Found</h3>
                    }
                  />
                  <Route
                    path="/unauthorized"
                    element={
                      <h3 className="text-center mt-4">403 Forbidden</h3>
                    }
                  />
                </Routes>
              </div>
              <Footer />
            </div>
            <ToastMessage />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </ToastProvider>
  );
}

export default MyRouters;
