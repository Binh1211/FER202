import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartActions";
import { Card, Button } from "react-bootstrap";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Giỏ hàng</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        cart.map((item, i) => (
          <Card key={i} className="mb-2">
            <Card.Body className="d-flex justify-content-between">
              <span>{item}</span>
              <Button
                variant="danger"
                onClick={() => dispatch(removeFromCart(i))}
              >
                Xóa
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}
