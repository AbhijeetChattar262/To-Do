import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../services/authServices";
import { LOGIN, REGISTER, USERNAME_LABEL, PASSWORD_LABEL} from "../../constants/LABELS";
import { USERNAME_PLACEHOLDER, PASSWORD_PLACEHOLDER } from "../../constants/PLACEHOLDERS";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  return (
    <Form
      onSubmit={(e) => handleLogin(e, username, password, navigate)}
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
        <Form.Label>{USERNAME_LABEL}</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={USERNAME_PLACEHOLDER}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{PASSWORD_LABEL}</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={PASSWORD_PLACEHOLDER}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mb-2">
        {LOGIN}
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={() => navigate("/register")}
        className="w-100"
      >
        {REGISTER}
      </Button>
    </Form>
  );
};

export default LoginForm;
