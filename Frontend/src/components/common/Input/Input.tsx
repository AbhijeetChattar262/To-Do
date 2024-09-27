import React from "react";
import { InputProps } from "./InputTypes";
import { InputStyled } from "./InputStyles";

const Input: React.FC<InputProps> = ({
  type = "text",
  width = "auto",
  onChange,
  placeholder,
  required,
}) => {
  return (
    <InputStyled
      type={type}
      width={width}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
