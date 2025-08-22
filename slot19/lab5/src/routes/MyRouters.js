import { CartProvider } from "../context/CartContext";
import { FavouriteProvider } from "../context/FavouriteContext";
import { ToastProvider } from "../context/ToastContext";
import { UserProvider } from "../context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "../component/Navbar";
import MyFavourites from "../component/MyFavourites";
import DishDetail from "../component/DishDetail";
import HomePage from "../pages/HomePage";
import Login from "../component/Login";
import ToastMessage from "../component/ToastMessage";
import { ThemeProvider } from "../context/ThemeContext";
import Cart from "../component/Cart";
import Profile from "../component/Profile";
import RegisterPage from "../pages/RegisterPage";
import Checkout from "../component/CheckOut";

function MyRouters() {
  return (
    <>
      <ThemeProvider>
        <ToastProvider>
          <CartProvider>
            <FavouriteProvider>
              <UserProvider>
                <AppNavbar />
                <ToastMessage />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/favourites" element={<MyFavourites />} />
                  <Route path="/dishes/:id" element={<DishDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route
                    path="*"
                    element={
                      <h3 className="text-center mt-4">404 Not Found</h3>
                    }
                  />
                </Routes>
              </UserProvider>
            </FavouriteProvider>
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}
export default MyRouters;
