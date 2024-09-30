import React from "react";
import { ButtonProps } from "./ButtonTypes";
import { ButtonStyled } from "./ButtonStyles";

const Button: React.FC<ButtonProps> = ({
  buttonStyle = "primary",
  width = "100%",
  children,
  ...rest
}) => {
  return (
    <ButtonStyled $buttonStyle={buttonStyle} $width={width} {...rest}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
