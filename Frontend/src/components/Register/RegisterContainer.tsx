import React from "react";
import Container from "../common/Container/Container";
import { RegisterContainerProps } from "../../interface/Auth";

const RegisterContainer: React.FC<RegisterContainerProps> = ({ children }) => {
  return <Container width="400px">{children}</Container>;
};

export default RegisterContainer;
