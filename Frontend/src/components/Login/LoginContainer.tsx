import React from "react";
import { Container } from "react-bootstrap";
import { LoginContainerProps} from "../../interface/Auth";
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
