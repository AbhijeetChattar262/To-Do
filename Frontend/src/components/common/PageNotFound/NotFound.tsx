import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Header,
  Subheader,
  Message,
  ButtonStyled,
} from "./NotFoundStyles";
import { GO_HOME_LABEL } from "../../../constants/labels";
import {
  PAGE_NOT_FOUND_HEADER,
  PAGE_NOT_FOUND_SUBHEADER,
  PAGE_NOT_FOUND_MESSAGE,
} from "../../../constants/messages";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the homepage
  };

  return (
    <Container>
      <Header>{PAGE_NOT_FOUND_HEADER}</Header>
      <Subheader>{PAGE_NOT_FOUND_SUBHEADER}</Subheader>
      <Message>{PAGE_NOT_FOUND_MESSAGE}</Message>
      <ButtonStyled onClick={handleGoHome}>{GO_HOME_LABEL}</ButtonStyled>
    </Container>
  );
};

export default NotFound;
