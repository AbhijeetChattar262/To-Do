import React from "react";
import { Container } from "react-bootstrap";

interface LoginContainerProps {
  children: React.ReactNode;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {children}
    </Container>
  );
};

export default LoginContainer;
