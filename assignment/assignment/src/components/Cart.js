import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Table, Button, Modal, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleIncrease = (item) => {
    addToCart({ ...item, quantity: 1 });
  };

  const handleDecrease = (item) => {
    decreaseQuantity(item.id);
  };

  const handleClearCart = () => {
    clearCart();
    setShowConfirm(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h3>Giỏ hàng trống</h3>
        <div className="mt-3">
          <Button variant="primary" onClick={() => navigate(-1)}>
            Quay lại mua hàng
          </Button>
        </div>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center">Giỏ hàng của bạn</h2>
      {/* Nút xóa tất cả */}
      <div className="text-end mt-3">
        <Button variant="warning" onClick={() => setShowConfirm(true)}>
          Xóa tất cả
        </Button>
      </div>
      {/* Bảng giỏ hàng */}
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                    rounded
                  />
                )}
              </td>
              <td>{item.title}</td>
              <td>${item.salePrice || item.price}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td>${(item.salePrice || item.price) * item.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between">
        <div className="text-start mt-2">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            Tiếp tục mua hàng
          </Button>
        </div>
        <h5 className="mt-2 text-end">Tổng tiền: ${totalPrice}</h5>
      </div>
      <div className="text-end my-3">
        <Button variant="primary" onClick={() => navigate("/checkout")}>
          Thanh toán
        </Button>
      </div>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Xóa tất cả
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
