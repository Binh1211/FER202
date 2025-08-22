import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Modal, Button } from "react-bootstrap";
import "../App.css";

const Cart = ({ darkMode }) => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleConfirm = () => setShowConfirm(true);
  const handleCloseConfirm = () => setShowConfirm(false);

  const handlePay = () => {
    setShowToast(true);
    clearCart();
    setShowConfirm(false);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="cart">
      <h2 className="text-center">Giỏ hàng</h2>
      <div className="d-flex justify-content-end align-items-center mb-4 mx-5">
        <Button variant="danger" size="sm" onClick={() => clearCart()}>
          Làm trống giỏ hàng
        </Button>
      </div>

      <table
        className={`table table-bordered w-80 mx-auto ${
          darkMode ? "dark-mode" : ""
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
          onClick={handleConfirm}
          disabled={cartItems.length === 0}
          className="mt-1"
        >
          Xác nhận đơn hàng
        </Button>
      </div>

      {/* Modal xác nhận đơn hàng */}
      <Modal show={showConfirm} onHide={handleCloseConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xác nhận và thanh toán đơn hàng này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            Đóng
          </Button>
          <Button variant="success" onClick={handlePay}>
            Thanh toán
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast thông báo thanh toán thành công */}
      {showToast && (
        <div className="toast-container p-3">
          <div
            className="toast show align-items-center text-bg-success border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body d-flex justify-content-between align-items-center">
              Thanh toán thành công! Cảm ơn bạn đã đặt hàng.
              <button
                type="button"
                className="btn-close btn-close-white ms-2 mb-1"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
