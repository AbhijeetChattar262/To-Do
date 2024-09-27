import styled from 'styled-components';

const ButtonStyled = styled.button<{ $buttonStyle: string; $width: string; }>` 
  width: ${({ $width }) => $width};
  margin-bottom: 0.4rem;
  margin-right: 0.4rem;
  background-color: ${({ $buttonStyle }) =>
    $buttonStyle === 'primary' ? '#007bff' :
      $buttonStyle === 'secondary' ? '#6c757d' :
        $buttonStyle === 'success' ? '#28a745' :
          $buttonStyle === 'danger' ? '#dc3545' :
            '#ffc107'};
  color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  border-radius: 0.25rem;
  &:hover {
    background-color: ${({ $buttonStyle }) =>
    $buttonStyle === 'primary' ? '#0056b3' :
      $buttonStyle === 'secondary' ? '#5a6268' :
        $buttonStyle === 'success' ? '#218838' :
          $buttonStyle === 'danger' ? '#c82333' :
            '#e0a800'};
  }
`;

export { ButtonStyled };
