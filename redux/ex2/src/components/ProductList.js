import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartActions";
import { Card, Button } from "react-bootstrap";

const products = ["Táo", "Chuối", "Cam"];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      {products.map((p, i) => (
        <Card key={i} className="mb-2">
          <Card.Body className="d-flex justify-content-between">
            <span>{p}</span>
            <Button onClick={() => dispatch(addToCart(p))}>Thêm vào giỏ</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
