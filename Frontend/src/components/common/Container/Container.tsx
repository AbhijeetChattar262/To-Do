import React from "react";
import { ContainerProps } from "./ContainerTypes";
import { GlobalContainerStyled } from "./ContainerStyles";

const Container: React.FC<ContainerProps> = ({ width, height, children }) => {
  return (
    <GlobalContainerStyled width={width} height={height}>
      {children}
    </GlobalContainerStyled>
  );
};

export default Container;
