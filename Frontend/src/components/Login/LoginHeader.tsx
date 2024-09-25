import React from "react";
import { LOGIN } from "../../constants/LABELS";
import { HeaderLabel } from "../../styles/FormStyles";

const LoginHeader: React.FC = () => {
  return <HeaderLabel>{LOGIN}</HeaderLabel>;  
};

export default LoginHeader;
