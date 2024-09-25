import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

export const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  color: #dc3545;
  margin-bottom: 10px;
`;

export const ErrorMessage = styled.p`
  font-size: 1.25rem;
  color: #6c757d;
  max-width: 600px;
  text-align: center;
`;

export const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
