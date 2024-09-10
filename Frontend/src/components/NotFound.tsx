import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the homepage
  };

  return (
    <Container className="text-center" style={{ marginTop: "100px" }}>
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="primary" onClick={handleGoHome}>
            Go Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
