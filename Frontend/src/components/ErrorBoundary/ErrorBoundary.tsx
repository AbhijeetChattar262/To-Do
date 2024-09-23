import { ErrorContainer, ErrorTitle, ErrorMessage, RetryButton } from '../../styles/ErrorBoundaryStyles';

const ErrorBoundary = () => {
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

export default ErrorBoundary;
