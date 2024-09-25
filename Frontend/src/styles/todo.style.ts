import styled from 'styled-components';

// =========================================================== TodoForm and TodoInput Styles ============================================================
export const TodoForm = styled.form`
  margin: 20px 0;
`;

export const TodoInput = styled.input`
  width: 97%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  margin-bottom: 10px;
`;
// =========================================================== TodoForm and TodoInput Styles End ============================================================

// ============================================================= Containers Styles | TodoPage Styles ============================================================
export const TodoContainer = styled.div`
  max-width: 1010px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 15px;
  background-color: #f7f7f7;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const TasksContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 10px; 
`;

export const TaskColumn = styled.div`
  flex: 1;
  padding-bottom: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
  margin: 0 10px; 
  transition: transform 0.3s ease, box-shadow 0.3s ease; 

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); 
  }
`;
// ============================================================= Containers Styles | TodoPage Styles End ============================================================

// ========================================================================= Lists Styles ================================================================================================

export const ListGroupStyled = styled.div`
  list-style: none;
  padding: 0;
`;

export const ListItemStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 19px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #fff;
`;

export const CheckboxStyled = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
// ========================================================================= Lists Styles End ================================================================================================

// ========================================================================= Header Styles ================================================================================================

export const TitleYourTask = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #3498db;
  margin-top: 20px;
  font-weight: bold;
`;

export const TaskTitle = styled.h3`
  color: #333;
  margin-bottom: 1px;
  font-weight: 600;
  text-align: center;
  font-size: 1.8rem;
  letter-spacing: 0.5px;
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
  font-family: cursive;
  margin-right: 20px;
`;
// ========================================================================= Header Styles End ================================================================================================
