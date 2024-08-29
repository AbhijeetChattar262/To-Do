import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/Register/RegisterForm";
import RegisterHeader from "../components/Register/RegisterHeader";
import RegisterContainer from "../components/Register/RegisterContainer";
import { handleRegister } from "../services/authServices";
import "bootstrap/dist/css/bootstrap.min.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
    <RegisterContainer>
      <RegisterHeader />
      <RegisterForm
        username={username}
        password={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onRegister={() => {
          handleRegister(username, password, navigate);
        }}
        onLoginRedirect={() => {
          navigate("/login");
        }}
      />
    </RegisterContainer>
  );
};

export default Register;
