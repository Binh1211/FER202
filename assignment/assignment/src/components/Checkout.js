import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, Table } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { ToastContext } from "../context/ToastContext";
import checkoutApi from "../api/checkoutApi"; // API cho checkout

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);

  const [checkouts, setCheckouts] = useState([]); // lưu danh sách checkout hiện có
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  // Tính tổng tiền
  const total = cartItems.reduce((sum, item) => {
    const price = item.salePrice || item.price;
    return sum + price * (item.quantity || 1);
  }, 0);

  // Lấy danh sách checkout để tính nextId
  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const res = await checkoutApi.getAll();
        setCheckouts(res.data);
      } catch (error) {
        console.error("Lỗi khi tải checkouts:", error);
      }
    };
    fetchCheckouts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      showToast("Vui lòng điền đầy đủ thông tin!", "warning");
      return;
    }

    try {
      // Tính id tự tăng
      const nextId =
        checkouts.length > 0 ? Math.max(...checkouts.map((c) => c.id)) + 1 : 1;

      // Tạo đơn hàng mới
      const newCheckout = {
        id: nextId,
        userId: Number(user?.id) || null,
        items: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          quantity: item.quantity || 1,
          price: item.salePrice || item.price,
        })),
        totalPrice: total,
        createdAt: new Date().toISOString(),
        address: formData.address,
        phone: formData.phone,
      };

      await checkoutApi.create(newCheckout);

      clearCart();
      showToast("Thanh toán thành công!", "success");
      navigate("/");
    } catch (error) {
      console.error("Checkout error:", error);
      showToast("Có lỗi khi thanh toán!", "danger");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h2>Giỏ hàng của bạn đang trống</h2>
        <Button variant="primary" onClick={() => navigate("/")}>
          Tiếp tục mua sắm
        </Button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2>Thanh toán</h2>
      <div className="row">
        {/* Giỏ hàng */}
        <div className="col-md-7">
          <Card className="mb-4">
            <Card.Header>Đơn hàng của bạn</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const price = item.salePrice || item.price;
                    return (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.quantity || 1}</td>
                        <td>${price}</td>
                        <td>${price * (item.quantity || 1)}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={3} className="text-end fw-bold">
                      Tổng cộng
                    </td>
                    <td className="fw-bold">${total}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <div className="mt-4 text-end">
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>
              Quay lại giỏ hàng
            </Button>
          </div>
        </div>

        {/* Form thông tin giao hàng */}
        <div className="col-md-5">
          <Card>
            <Card.Header>Thông tin giao hàng</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button type="submit" variant="success" className="w-100">
                  Xác nhận thanh toán
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
