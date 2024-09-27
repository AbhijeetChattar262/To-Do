import React from "react";
import {
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
  RetryButton,
} from "./FallbackComponentStyles";

const FallbackComponent: React.FC = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <ErrorContainer>
      <ErrorTitle>Oops! Something went wrong.</ErrorTitle>
      <ErrorMessage>We're working on it. Please try again later.</ErrorMessage>
      <RetryButton onClick={handleRetry}>Retry</RetryButton>
    </ErrorContainer>
  );
};
export default FallbackComponent;
