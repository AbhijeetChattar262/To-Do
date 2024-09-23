import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

export const Row = styled.div`
  width: 100%;
`;

export const Col = styled.div`
  flex: 1;
  max-width: 400px; 
  margin: 0 auto;
`;

export const FormContainer = styled.form`
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export const FormControl = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ced4da;

  &:focus {
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const Button = styled.button`
  width: 100%;
  margin-bottom: 0.5rem; 
  background-color: #007bff; 
  color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background-color: #0056b3; 
  }
`;

export const Header = styled.h1`
  margin-bottom: 1rem; 
  font-size: 1.5rem; 
  text-align: center;
  color: #343a40; 
  width: 100%; 
  display: flex;
  justify-content: center; 
`;

export const GreenButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

export const RegisterButton = styled.button`
  width: 100%;
  margin-bottom: 0.5rem;
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background-color: #007bff; 
  }
`;




