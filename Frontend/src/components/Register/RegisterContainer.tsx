import React from "react";
import { Container, Row, Col } from "../../styles/FormStyles";
import { RegisterContainerProps } from "../../interface/Auth";

const RegisterContainer: React.FC<RegisterContainerProps> = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

export default RegisterContainer;
