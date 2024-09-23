import React from "react";
import { SpinnerContainer, SpinnerStyled } from "../../styles/SpinnerStyles";

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <SpinnerStyled aria-label="Loading..." />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
