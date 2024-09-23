import React from "react";
import { Container, Row, Col } from "../../styles/FormStyles";
import { LoginContainerProps } from "../../interface/Auth";

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

export default LoginContainer;
