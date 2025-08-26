import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authActions";
import { Card, Button } from "react-bootstrap";

export default function UserInfo() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) return null; // nếu chưa login thì không render

  return (
    <Card className="p-3 shadow-sm">
      <Card.Body>
        <h3 className="mb-3">Xin chào, {user}!</h3>
        <Button variant="danger" onClick={() => dispatch(logout())}>
          Đăng xuất
        </Button>
      </Card.Body>
    </Card>
  );
}
