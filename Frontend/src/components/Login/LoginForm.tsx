import React from "react";
import { Form, Button } from "react-bootstrap";

interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onRegister,
}) => {
  return (
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
          onChange={onUsernameChange}
          placeholder="Enter your username"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Enter your password"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mb-2">
        Login
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={onRegister}
        className="w-100"
      >
        Register
      </Button>
    </Form>
  );
};

export default LoginForm;
