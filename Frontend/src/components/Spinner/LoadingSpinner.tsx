import React from "react";
import { Spinner, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LoadingSpinner: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Spinner animation="border" role="status" variant="primary" style={{ width: "4rem", height: "4rem" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default LoadingSpinner;
