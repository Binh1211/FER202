import React, { useEffect, useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const CartToast = () => {
  const { toast, hideToast } = useContext(CartContext);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => hideToast(), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast show={toast.visible} onClose={hideToast} bg="success">
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CartToast;
