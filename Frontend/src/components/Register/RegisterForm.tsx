import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import AuthService from "../../services/auth.service";
import {
  REGISTER,
  USERNAME_LABEL,
  PASSWORD_LABEL,
} from "../../constants/labels";
import {
  USERNAME_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from "../../constants/placeholders";
import { ALREADY_REGISTERED } from "../../constants/messages";
import Container from "../common/Container/Container";
import { FormContainer, FormGroup, FormLabel } from "../../styles/form.style";
import Input from "../common/Input/Input";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AuthService.handleRegister(
      e,
      username,
      password,
      setUsername,
      setPassword,
      navigate
    );
  };

  return (
    <Container width="400px" height="400px">
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>{USERNAME_LABEL}</FormLabel>
          <Input
            type="text"
            placeholder={USERNAME_PLACEHOLDER}
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
          />
          <FormLabel>{PASSWORD_LABEL}</FormLabel>
          <Input
            type="password"
            placeholder={PASSWORD_PLACEHOLDER}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
        </FormGroup>
        <Button type="submit" buttonStyle="primary">
          {REGISTER}
        </Button>
        <Button
          type="button"
          buttonStyle="success"
          onClick={() => navigate("/login")}
        >
          {ALREADY_REGISTERED}
        </Button>
      </FormContainer>
    </Container>
  );
};

export default RegisterForm;
