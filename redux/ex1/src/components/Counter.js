import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counterActions";
import { Card, Button } from "react-bootstrap";

export default function Counter() {
  const count = useSelector((state) => state.counter); // ✅ lấy count từ Redux
  const dispatch = useDispatch();

  return (
    <Card className="text-center p-3 shadow-sm">
      <Card.Body>
        <h2 className="mb-3">Giá trị hiện tại: {count}</h2>
        <div className="d-flex justify-content-center gap-2">
          <Button variant="danger" onClick={() => dispatch(decrement())}>
            Giảm
          </Button>
          <Button variant="success" onClick={() => dispatch(increment())}>
            Tăng
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
