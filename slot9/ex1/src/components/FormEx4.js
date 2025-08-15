import React, { useState, useReducer } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

// Reducer để quản lý trạng thái form
const initialState = {
  name: "",
  age: "",
  email: "",
  phone: "",
  gender: "",
  check: false,
  isSubmitted: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SUBMIT":
      return { ...state, isSubmitted: true };
    default:
      return state;
  }
};
// Component Form
const FormEx4 = ({ title, onSubmit }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false); // Biến để kiểm soát việc hiển thị alert

  // Hàm xử lý thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  // Hàm kiểm tra lỗi trước khi submit
  const handleValidation = () => {
    const newErrors = {};
    if (state.name.length < 3 || state.name.length > 50) {
      newErrors.name = "Tên phải có từ 3 đến 50 ký tự!";
    }
    if (!state.age || isNaN(state.age) || state.age < 18 || state.age > 100) {
      newErrors.age = "Tuổi phải là một số hợp lệ từ 18 đến 100!";
    }
    if (!state.email) newErrors.email = "Email không được để trống!";
    if (!state.gender) newErrors.gender = "Giới tính không được để trống!";
    if (!state.phone) newErrors.phone = "Số điện thoại không được để trống!";
    if (!state.check) newErrors.check = "abc";

    // Nếu có lỗi, hiển thị alert
    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
    console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch({ type: "SUBMIT" });
      onSubmit(state);
    }
  };

  return (
    <Container>
      <h1>{title}</h1>
      {/* Hiển thị Alert nếu có lỗi */}
      {showAlert && (
        <Alert variant="danger">
          <strong>Lỗi:</strong> Vui lòng kiểm tra các trường hợp lỗi.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formAge">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="text"
            name="age"
            value={state.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={state.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formGender">
          <Form.Label>Giới tính</Form.Label>
          <Form.Control
            type="text"
            name="gender"
            value={state.gender}
            onChange={handleChange}
            isInvalid={!!errors.gender}
          />
          <Form.Control.Feedback type="invalid">
            {errors.gender}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formCheck">
          <Form.Check
            type="checkbox"
            name="check"
            label="Đồng ý với điều khoản"
            checked={state.check}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "check",
                value: e.target.checked,
              })
            }
            isInvalid={!!errors.check}
          />
          <Form.Control.Feedback type="invalid">
            {errors.check}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
// Xác định PropTypes cho MyForm
FormEx4.propTypes = {
  title: PropTypes.string.isRequired, // Tiêu đề phải là một chuỗi
  onSubmit: PropTypes.func.isRequired, // Hàm onSubmit phải là một function
};
export default FormEx4;
