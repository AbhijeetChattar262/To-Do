import styled from 'styled-components';

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const SpinnerStyled = styled.div`
  width: 4rem;
  height: 4rem;
  border: 0.5rem solid transparent;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
