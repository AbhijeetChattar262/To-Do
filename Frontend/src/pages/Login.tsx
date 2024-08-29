import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/authServices";
import LoginForm from "../components/Login/LoginForm";
import LoginHeader from "../components/Login/LoginHeader";
import LoginContainer from "../components/Login/LoginContainer";
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    handleLogin(e, username, password, navigate);
  };

  const onRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <LoginContainer>
      <LoginHeader />
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={onSubmit}
        onRegister={onRegister}
      />
    </LoginContainer>
  );
};

export default Login;
