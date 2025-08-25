import React, { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";

const ToastMessage = () => {
  const { toastState, hideToast } = useContext(ToastContext);

  return (
    <ToastContainer
      position="bottom-end"
      className="p-3"
      style={{ position: "fixed", bottom: 0, right: 0, zIndex: 1050 }}
    >
      <Toast
        bg={toastState.type}
        show={toastState.visible}
        onClose={hideToast}
        delay={2000}
        autohide
      >
        <Toast.Body className="text-white fw-bold">
          {toastState.message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
