import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import userApi from "../api/userApi";

const RegisterWizard = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: null,
    avatarPreview: "",
    username: "",
    password: "",
    confirm: "",
    secretQuestion: "",
    secretAnswer: "",
  });
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({
            ...prev,
            avatar: file,
            avatarPreview: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Validation
  const errors = {
    name: !form.name.trim() ? "Vui lòng nhập họ tên" : "",
    email: !/\S+@\S+\.\S+/.test(form.email) ? "Email không hợp lệ" : "",
    avatar:
      form.avatar &&
      (form.avatar.size > 2 * 1024 * 1024 ||
        !/image\/(jpeg|png)/.test(form.avatar.type))
        ? "Ảnh phải là jpg/png và ≤ 2MB"
        : "",
    username: !form.username.trim() ? "Vui lòng nhập username" : "",
    password: form.password.length < 6 ? "Mật khẩu tối thiểu 6 ký tự" : "",
    confirm: form.confirm !== form.password ? "Mật khẩu không khớp" : "",
    secretQuestion: !form.secretQuestion ? "Chọn câu hỏi bảo mật" : "",
    secretAnswer: !form.secretAnswer.trim() ? "Vui lòng nhập câu trả lời" : "",
  };

  const isStep1Valid = !errors.name && !errors.email && !errors.avatar;
  const isStep2Valid =
    !errors.username &&
    !errors.password &&
    !errors.confirm &&
    !errors.secretQuestion &&
    !errors.secretAnswer;

  const handleNext = () => setStep(2);
  const handlePrev = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userApi.getAll();
      const accounts = res.data;

      // Kiểm tra trùng email
      const emailExists = accounts.some((a) => a.email === form.email);
      if (emailExists) {
        setMessage({ type: "danger", text: "Email đã tồn tại!" });
        return;
      }

      // Kiểm tra trùng username
      const usernameExists = accounts.some((a) => a.username === form.username);
      if (usernameExists) {
        setMessage({ type: "danger", text: "Username đã tồn tại!" });
        return;
      }

      // Nếu không trùng thì tạo tài khoản
      const nextId =
        accounts.length > 0 ? Math.max(...accounts.map((a) => a.id)) + 1 : 1;

      await register({
        id: nextId,
        name: form.name,
        email: form.email,
        avatar: form.avatarPreview,
        username: form.username,
        password: form.password,
        secretQuestion: form.secretQuestion,
        secretAnswer: form.secretAnswer,
        role: "user",
      });

      setMessage({ type: "success", text: "Đăng ký thành công!" });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Có lỗi xảy ra. Vui lòng thử lại!" });
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f5f6fa" }}
    >
      <Card style={{ width: "500px" }} className="shadow-lg p-4 rounded-3">
        <Card.Body>
          <h3 className="text-center mb-4">Đăng ký</h3>
          {message && <Alert variant={message.type}>{message.text}</Alert>}

          <Form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    accept="image/png,image/jpeg"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.avatar && !!errors.avatar}
                  />
                  {form.avatarPreview && (
                    <Image
                      src={form.avatarPreview}
                      thumbnail
                      className="mt-2"
                      style={{ maxHeight: "150px" }}
                    />
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.avatar}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                >
                  Tiếp tục
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nhập lại mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirm && !!errors.confirm}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Câu hỏi bảo mật</Form.Label>
                  <Form.Select
                    name="secretQuestion"
                    value={form.secretQuestion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.secretQuestion && !!errors.secretQuestion
                    }
                  >
                    <option value="">-- Chọn --</option>
                    <option value="pet">Tên thú cưng đầu tiên?</option>
                    <option value="school">Tên trường tiểu học?</option>
                    <option value="city">Thành phố sinh ra?</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.secretQuestion}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Câu trả lời</Form.Label>
                  <Form.Control
                    type="text"
                    name="secretAnswer"
                    value={form.secretAnswer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.secretAnswer && !!errors.secretAnswer}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.secretAnswer}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handlePrev}>
                    Quay lại
                  </Button>
                  <Button
                    type="submit"
                    variant="success"
                    disabled={!isStep2Valid}
                  >
                    Đăng ký
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterWizard;
