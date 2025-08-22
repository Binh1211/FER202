import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ToastContext } from "../context/ToastContext";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const navigator = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handlePay = () => {
    clearCart();
    showToast("Thanh toán thành công!", "success");
    setShowModal(false);
    navigator("/");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0
  );

  return (
    <div
      className={`App ${theme === "dark" ? "dark-mode" : ""}`}
      style={{ minHeight: "92vh" }}
    >
      <Container className="pt-5">
        <h2 className="text-center mb-4">Checkout</h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Giỏ hàng trống.</p>
        ) : (
          <>
            <Table
              striped
              bordered
              hover
              className={theme === "dark" ? "table-dark" : ""}
            >
              <thead>
                <tr>
                  <th>Tên món</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.cartId}>
                    <td>{item.name}</td>
                    <td>${parseFloat(item.price).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <strong>Tổng cộng</strong>
                  </td>
                  <td>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </Table>

            <div className="d-flex justify-content-end">
              <Button variant="success" onClick={() => setShowModal(true)}>
                Xác nhận thanh toán
              </Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Xác nhận đơn hàng</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Bạn có chắc chắn muốn thanh toán đơn hàng này không?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Hủy
                </Button>
                <Button variant="success" onClick={handlePay}>
                  Thanh toán
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Container>
    </div>
  );
};

export default Checkout;
