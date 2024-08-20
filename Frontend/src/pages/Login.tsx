import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/authServices/authServices";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    handleLogin(e, username, password, navigate);
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h2 className="mb-4">Login</h2>
      <Form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-2">
          Login
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => navigate("/register")}
          className="w-100"
        >
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
