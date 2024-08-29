import React from "react";
import { Form, Button } from "react-bootstrap";

interface RegisterFormProps {
  username: string;
  password: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRegister: () => void;
  onLoginRedirect: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onRegister,
  onLoginRedirect,
}) => {
  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={onUsernameChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="mt-3">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </Form.Group>
      <Button className="mt-4 w-100" variant="primary" onClick={onRegister}>
        Register
      </Button>
      <Button
        className="mt-3 w-100"
        variant="success"
        onClick={onLoginRedirect}
      >
        Already have an account? Login
      </Button>
    </Form>
  );
};

export default RegisterForm;
