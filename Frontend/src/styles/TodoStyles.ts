import styled from 'styled-components';

export const Form = styled.form`
  margin: 20px 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  margin-right: 10px;  /* Add margin for spacing */

  &:hover {
    background-color: #0056b3;
  }
`;

export const ButtonDelete = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

export const ListGroupStyled = styled.div`
  list-style: none;
  padding: 0;
`;

export const ListItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #fff;
`;

export const CheckboxStyled = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const WelcomeMessage = styled.h3`
  font-size: 1.5rem;
  color: darkblue;
  font-weight: 500;
  font-family:cursive;  
  font
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #3498db; 
  margin-top: 20px;
  font-weight: bold;
`;

export const ButtonLogout = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b; 
  }
`;
