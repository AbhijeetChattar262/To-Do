import styled from 'styled-components';

const InputStyled = styled.input<{width:string}>`
  width: ${({ width }) => width || '100%'};
  height: auto;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  margin-bottom: 12px;

  &:focus {
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

`;

export { InputStyled };
