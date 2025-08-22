import React, { createContext, useReducer, useContext } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { toastReducer } from "../reducers/toastReducer";
import { ToastContext } from "./ToastContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, cartDispatch] = useReducer(cartReducer, []);
  const [toast, toastDispatch] = useReducer(toastReducer, {
    visible: false,
    message: "",
  });
  const { showToast } = useContext(ToastContext);

  const addToCart = (dish) => {
    const uniqueDish = { ...dish, cartId: Date.now().toString() };
    cartDispatch({ type: "ADD_TO_CART", payload: uniqueDish });
    showToast("Đã thêm vào giỏ hàng!", "success");
  };

  const removeFromCart = (cartId) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: cartId });
    showToast("Đã xóa món khỏi giỏ hàng!", "info");
  };

  const clearCart = () => {
    cartDispatch({ type: "CLEAR_CART" });
    showToast("Đã xóa tất cả món trong giỏ hàng!", "warning");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        toast,
        toastDispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
