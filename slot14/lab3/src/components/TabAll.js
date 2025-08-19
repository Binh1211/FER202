import React, { useReducer, useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Modal,
  Toast,
  Button,
  ProgressBar,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import AboutForm from "./AboutForm";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";

const initialState = {
  step: 0,
  about: { firstName: "", lastName: "", email: "", avatar: "" },
  account: {
    username: "",
    password: "",
    confirmPassword: "",
    secretQuestion: "",
    answer: "",
  },
  address: { country: "", city: "", street: "" },
  errors: { about: {}, account: {}, address: {} },
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.form]: { ...state[action.form], [action.field]: action.value },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, [action.form]: action.errors },
      };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// Validation rules
const validate = (form, data) => {
  let errors = {};
  if (form === "about") {
    if (!data.firstName.trim()) errors.firstName = "First name is required";
    if (!data.lastName.trim()) errors.lastName = "Last name is required";
    if (!data.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Invalid email";
  }
  if (form === "account") {
    if (!data.username.trim()) errors.username = "Username is required";
    if (!data.password) errors.password = "Password is required";
    if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!data.secretQuestion)
      errors.secretQuestion = "Secret question is required";
    if (!data.answer.trim()) errors.answer = "Answer is required";
  }
  if (form === "address") {
    if (!data.country) errors.country = "Country is required";
    if (!data.city.trim()) errors.city = "City is required";
    if (!data.street.trim()) errors.street = "Street is required";
  }
  return errors;
};

function TabAll() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const steps = ["about", "account", "address"];
  const currentForm = steps[state.step];

  useEffect(() => {
    const errors = validate(currentForm, state[currentForm]);
    dispatch({ type: "SET_ERRORS", form: currentForm, errors });
  }, [state[currentForm], state.step]);

  const handleChange = (form, field, value) => {
    dispatch({ type: "UPDATE_FIELD", form, field, value });
  };

  const handleNext = () => {
    const errors = validate(currentForm, state[currentForm]);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", form: currentForm, errors });
      return;
    }
    if (state.step < steps.length - 1) {
      dispatch({ type: "NEXT_STEP" });
    } else {
      localStorage.setItem("profileData", JSON.stringify(state));
      setShowModal(true);
      setShowToast(true);
    }
  };

  const handlePrev = () => {
    if (state.step > 0) dispatch({ type: "PREV_STEP" });
  };

  const progress = ((state.step + 1) / steps.length) * 100;
  const isStepValid = Object.keys(state.errors[currentForm]).length === 0;

  return (
    <div
      style={{
        width: "850px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        background: "#fff",
      }}
    >
      <ProgressBar now={progress} className="mb-3" />

      <Tabs
        activeKey={currentForm}
        id="profile-tabs"
        className="mb-3"
        justify
        variant="pills"
      >
        <Tab eventKey="about" title="About" disabled={state.step !== 0}>
          <AboutForm
            data={state.about}
            errors={state.errors.about}
            onChange={(field, value) => handleChange("about", field, value)}
            onNext={handleNext}
            disabledNext={!isStepValid}
          />
        </Tab>
        <Tab eventKey="account" title="Account" disabled={state.step !== 1}>
          <AccountForm
            data={state.account}
            errors={state.errors.account}
            onChange={(field, value) => handleChange("account", field, value)}
            onNext={handleNext}
            onPrev={handlePrev}
            disabledNext={!isStepValid}
          />
        </Tab>
        <Tab eventKey="address" title="Address" disabled={state.step !== 2}>
          <AddressForm
            data={state.address}
            errors={state.errors.address}
            onChange={(field, value) => handleChange("address", field, value)}
            onNext={handleNext}
            onPrev={handlePrev}
            disabledNext={!isStepValid}
          />
        </Tab>
      </Tabs>

      {/* Modal khi Finish */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="p-3 shadow-sm">
            <Row>
              <Col md={4} className="text-center">
                {state.about.avatar ? (
                  <img
                    src={state.about.avatar}
                    alt="Avatar"
                    className="img-fluid rounded-circle"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: "#eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    No Avatar
                  </div>
                )}
              </Col>
              <Col md={8}>
                <p>
                  <strong>First Name:</strong> {state.about.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {state.about.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {state.about.email}
                </p>
                <p>
                  <strong>Username:</strong> {state.account.username}
                </p>
                <p>
                  <strong>Secret Question:</strong>{" "}
                  {state.account.secretQuestion}
                </p>
                <p>
                  <strong>Answer:</strong> {state.account.answer}
                </p>
                <p>
                  <strong>Country:</strong> {state.address.country}
                </p>
                <p>
                  <strong>City:</strong> {state.address.city}
                </p>
                <p>
                  <strong>Street:</strong> {state.address.street}
                </p>
              </Col>
            </Row>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setShowModal(false);
              dispatch({ type: "RESET" });
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast khi Finish */}
      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default TabAll;
