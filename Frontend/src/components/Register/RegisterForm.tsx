import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer, FormGroup, FormLabel, FormControl, Button, GreenButton } from "../../styles/FormStyles";
import { handleRegister } from "../../services/authServices";
import { REGISTER, USERNAME_LABEL, PASSWORD_LABEL } from "../../constants/LABELS";
import { USERNAME_PLACEHOLDER, PASSWORD_PLACEHOLDER } from "../../constants/PLACEHOLDERS";
import { ALREADY_REGISTERED } from "../../constants/MESSAGES";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
    <FormContainer>
      <FormGroup>
        <FormLabel>{USERNAME_LABEL}</FormLabel>
        <FormControl
          type="text"
          placeholder={USERNAME_PLACEHOLDER}
          value={username}
          onChange={(e:any) => setUsername(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>{PASSWORD_LABEL}</FormLabel>
        <FormControl
          type="password"
          placeholder={PASSWORD_PLACEHOLDER}
          value={password}
          onChange={(e:any) => setPassword(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit" onClick={(e:any) => handleRegister(e, username, password, navigate)}>{REGISTER}</Button>
      <GreenButton type="button" onClick={() => navigate("/login")}>{ALREADY_REGISTERED}</GreenButton>
    </FormContainer>
  );
};

export default RegisterForm;
