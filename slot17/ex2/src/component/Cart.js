import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Modal, Button } from "react-bootstrap";

const Cart = () => {
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
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="my-2">
              {item.name} - {item.price}$
              <Button
                variant="danger"
                size="sm"
                className="ms-2"
                onClick={() => removeFromCart(item.id)}
              >
                Xóa
              </Button>
            </li>
          ))}
        </ul>
      )}
      <div className="d-flex gap-2 mt-3">
        <Button
          variant="warning"
          onClick={handleConfirm}
          disabled={cartItems.length === 0}
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
