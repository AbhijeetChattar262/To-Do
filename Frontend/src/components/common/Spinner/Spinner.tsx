import React from "react";
import { SpinnerContainer, SpinnerStyled } from "./SpinnerStyles";

const Spinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <SpinnerStyled aria-label="Loading..." />
    </SpinnerContainer>
  );
};

export default Spinner;
