import styled from 'styled-components';

const GlobalContainerStyled = styled.div<{ width?: string }>`
  max-width: ${({ width }) => width || '100%'};
  max-height:${({ height }) => height || '100%'};
  margin: 0 auto; 
  padding: 10px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
`;

export { GlobalContainerStyled };
