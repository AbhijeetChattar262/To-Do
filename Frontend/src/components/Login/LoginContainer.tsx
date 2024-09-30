import React from "react";
import Container from "../common/Container/Container";
import { LoginContainerProps } from "../../interface/Auth";

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return <Container width="400px">{children}</Container>;
};

export default LoginContainer;
