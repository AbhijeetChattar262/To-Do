import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  margin-top: 100px;
`;

export const Header = styled.h1`
  font-size: 3rem;
`;

export const Subheader = styled.h2`
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  font-size: 1.25rem;
`;

export const ButtonStyled = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;
