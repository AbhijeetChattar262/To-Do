import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface RegisterContainerProps {
  children: React.ReactNode;
}

const RegisterContainer: React.FC<RegisterContainerProps> = ({ children }) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterContainer;
