import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "react-bootstrap";
import "../App.css";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const navigator = useNavigate();
  const { user } = useContext(UserContext);

  const handlePay = () => {
    if (user) {
      navigator("/checkout");
    } else {
      navigator("/login");
    }
  };

  return (
    <div
      className={`App ${theme === "dark" ? "dark-mode" : ""} pb-1 cart`}
      style={{ minHeight: "92vh" }}
    >
      <h2 className="text-center">Giỏ hàng</h2>
      <div className="d-flex justify-content-end align-items-center mb-4 mx-5 gap-2">
        <Button variant="primary" size="sm" onClick={() => navigator("/")}>
          Tiếp tục mua hàng
        </Button>
        <Button variant="danger" size="sm" onClick={() => clearCart()}>
          Làm trống giỏ hàng
        </Button>
      </div>

      <table
        className={`table table-bordered w-80 mx-auto ${
          theme === "dark" ? "dark-mode" : ""
        }`}
      >
        <thead>
          <tr>
            <th className="text-center">Tên món</th>
            <th className="text-center">Giá</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                Giỏ hàng trống.
              </td>
            </tr>
          ) : (
            <>
              {cartItems.map((item) => (
                <tr key={item.cartId}>
                  <td>{item.name}</td>
                  <td className="text-center">{item.price}$</td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.cartId)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end mt-3 mx-5">
        <Button
          variant="warning"
          onClick={handlePay}
          disabled={cartItems.length === 0}
          className="mt-1"
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default Cart;
