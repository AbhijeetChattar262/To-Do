import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now log in!",
        background: "#d4edda",
        color: "#155724",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Login",
      }).then(() => {
        navigate("/login");
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          err.response?.data.message || "An error occurred. Please try again.",
        background: "#f8d7da",
        color: "#721c24",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <h1 className="text-center mb-4">Register</h1>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </Form.Group>
            <Button
              className="mt-4 w-100"
              variant="primary"
              onClick={handleRegister}
            >
              Register
            </Button>
            <Button
              className="mt-3 w-100"
              variant="success"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
