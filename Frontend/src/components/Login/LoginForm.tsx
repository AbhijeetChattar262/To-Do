import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer, FormGroup, FormLabel, FormControl, Button ,RegisterButton} from "../../styles/FormStyles";
import { handleLogin } from "../../services/authServices";
import { LOGIN, REGISTER, USERNAME_LABEL, PASSWORD_LABEL } from "../../constants/LABELS";
import { USERNAME_PLACEHOLDER, PASSWORD_PLACEHOLDER } from "../../constants/PLACEHOLDERS";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
    <FormContainer onSubmit={(e:any) => handleLogin(e, username, password, navigate)}>
      <FormGroup>
        <FormLabel>{USERNAME_LABEL}</FormLabel>
        <FormControl
          type="text"
          value={username}
          onChange={(e:any) => setUsername(e.target.value)}
          placeholder={USERNAME_PLACEHOLDER}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>{PASSWORD_LABEL}</FormLabel>
        <FormControl
          type="password"
          value={password}
          onChange={(e:any) => setPassword(e.target.value)}
          placeholder={PASSWORD_PLACEHOLDER}
          required
        />
      </FormGroup>
      <Button type="submit">{LOGIN}</Button>
      <RegisterButton type="button" onClick={() => navigate("/register")}>{REGISTER}</RegisterButton>
    </FormContainer>
  );
};

export default LoginForm;
