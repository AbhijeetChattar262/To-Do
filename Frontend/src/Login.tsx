import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        background: "#d4edda",
        color: "#155724",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Proceed",
      }).then(() => {
        navigate("/todos");
      });
    } catch (error: any) {
      console.error("Login error", error);
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: error.response?.data.message || "Enter correct credentials!!",
        background: "#f8d7da",
        color: "#721c24",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h2 className="mb-4">Login</h2>
      <Form
        onSubmit={handleLogin}
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
