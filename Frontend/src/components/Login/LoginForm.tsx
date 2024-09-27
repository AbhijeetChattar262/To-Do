import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import { FormContainer, FormGroup, FormLabel } from "../../styles/form.style";
import AuthService from "../../services/auth.service";
import {
  LOGIN,
  REGISTER,
  USERNAME_LABEL,
  PASSWORD_LABEL,
} from "../../constants/labels";
import {
  USERNAME_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from "../../constants/placeholders";
import Container from "../common/Container/Container";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AuthService.handleLogin(e, username, password, navigate);
  };

  return (
    <Container width="400px" height="400px">
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>{USERNAME_LABEL}</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder={USERNAME_PLACEHOLDER}
            required
          />

          <FormLabel>{PASSWORD_LABEL}</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder={PASSWORD_PLACEHOLDER}
            required
          />
        </FormGroup>
        <Button type="submit" buttonStyle="primary">
          {LOGIN}
        </Button>
        <Button
          type="button"
          buttonStyle="secondary"
          onClick={() => navigate("/register")}
        >
          {REGISTER}
        </Button>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
