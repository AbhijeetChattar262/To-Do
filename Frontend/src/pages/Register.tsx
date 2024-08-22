import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleRegister } from "../services/authServices";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

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
                required
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
                required
              />
            </Form.Group>
            <Button
              className="mt-4 w-100"
              variant="primary"
              onClick={() => handleRegister(username, password, navigate)}
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
