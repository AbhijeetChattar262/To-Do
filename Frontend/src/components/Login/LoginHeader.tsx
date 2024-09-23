import React from "react";
import { LOGIN } from "../../constants/LABELS";
import { Header } from "../../styles/FormStyles"; 

const LoginHeader: React.FC = () => {
  return <Header>{LOGIN}</Header>; // Use the styled Header component
};

export default LoginHeader;
