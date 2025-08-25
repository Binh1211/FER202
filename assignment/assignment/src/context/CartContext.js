import React, { createContext, useReducer, useContext, useEffect } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { ToastContext } from "./ToastContext";
import { UserContext } from "./UserContext";
import userApi from "../api/userApi";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);
  const [cartItems, cartDispatch] = useReducer(cartReducer, []);

  // Lấy cart từ user khi login
  useEffect(() => {
    if (user?.cart) {
      cartDispatch({ type: "INIT_CART", payload: user.cart });
    }
  }, [user]);

  const syncCartToServer = async (updatedCart) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, cart: updatedCart };
      await userApi.update(user.id, updatedUser);
    } catch (err) {
      console.error("Cập nhật giỏ hàng thất bại:", err);
      showToast("Cập nhật giỏ hàng thất bại!", "danger");
    }
  };

  const addToCart = async (product) => {
    let updatedCart;
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      cartDispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: product.id, quantity: existingItem.quantity + 1 },
      });
      showToast("Đã cập nhật giỏ hàng!", "info");
    } else {
      const newProduct = {
        ...product,
        quantity: 1,
      };
      updatedCart = [...cartItems, newProduct];
      cartDispatch({ type: "ADD_TO_CART", payload: newProduct });
      showToast("Đã thêm vào giỏ hàng!", "success");
    }

    await syncCartToServer(updatedCart);
  };

  const decreaseQuantity = async (id) => {
    const existingItem = cartItems.find((item) => item.id === id);
    if (!existingItem) return;

    let updatedCart;
    if (existingItem.quantity > 1) {
      updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      cartDispatch({
        type: "UPDATE_QUANTITY",
        payload: { id, quantity: existingItem.quantity - 1 },
      });
    } else {
      updatedCart = cartItems.filter((item) => item.id !== id);
      cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
    }

    showToast("Đã cập nhật giỏ hàng!", "info");
    await syncCartToServer(updatedCart);
  };

  const removeFromCart = async (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
    showToast("Đã xóa sản phẩm khỏi giỏ hàng!", "info");
    await syncCartToServer(updatedCart);
  };

  const clearCart = async () => {
    cartDispatch({ type: "CLEAR_CART" });
    showToast("Đã xóa tất cả sản phẩm trong giỏ hàng!", "warning");
    await syncCartToServer([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
