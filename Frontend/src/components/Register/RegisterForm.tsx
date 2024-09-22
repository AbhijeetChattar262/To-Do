import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { handleRegister } from "../../services/authServices";
import { REGISTER, USERNAME_LABEL, PASSWORD_LABEL} from "../../constants/LABELS";
import { USERNAME_PLACEHOLDER, PASSWORD_PLACEHOLDER } from "../../constants/PLACEHOLDERS";
import { ALREADY_REGISTERED } from "../../constants/MESSAGES";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>{USERNAME_LABEL}</Form.Label>
        <Form.Control
          type="text"
          placeholder={USERNAME_PLACEHOLDER}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="mt-3">
        <Form.Label>{PASSWORD_LABEL}</Form.Label>
        <Form.Control
          type="password"
          placeholder={PASSWORD_PLACEHOLDER}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button
        className="mt-4 w-100"
        variant="primary"
        type="submit"
        onClick={(e) => handleRegister(e, username, password, navigate)}
      >
        {REGISTER}
      </Button>
      <Button
        className="mt-3 w-100"
        variant="success"
        onClick={() => navigate("/login")}
      >
        {ALREADY_REGISTERED}
      </Button>
    </Form>
  );
};

export default RegisterForm;
