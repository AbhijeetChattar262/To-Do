import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GO_HOME_LABEL } from "../constants/LABELS";
import { PAGE_NOT_FOUND_HEADER, PAGE_NOT_FOUND_SUBHEADER,PAGE_NOT_FOUND_MESSAGE } from "../constants/MESSAGES";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the homepage
  };

  return (
    <Container className="text-center" style={{ marginTop: "100px" }}>
      <Row>
        <Col>
          <h1 className="display-1">{PAGE_NOT_FOUND_HEADER}</h1>
          <h2 className="mb-4">{PAGE_NOT_FOUND_SUBHEADER}</h2>
          <p className="lead">
            {PAGE_NOT_FOUND_MESSAGE}
          </p>
          <Button variant="primary" onClick={handleGoHome}>
            {GO_HOME_LABEL}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
