import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import LoginHeader from "../components/Login/LoginHeader";
import LoginContainer from "../components/Login/LoginContainer";

const Login: React.FC = () => {
  const navigate = useNavigate();

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
      <LoginForm />
    </LoginContainer>
  );
};

export default Login;
