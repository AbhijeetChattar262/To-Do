// TodoHeader.tsx
import React, { useContext } from "react";
import {
  HeaderContainer,
  WelcomeMessage,
  TitleYourTask,
} from "../../styles/todo.style";
import { LOGOUT, YOUR_TASKS } from "../../constants/labels";
import { WELCOME } from "../../constants/messages";
import Button from "../common/Button/Button";
import {TodoContext} from "../../context/Context";

const TodoHeader: React.FC = () => {
  const { handleUserLogout, username } = useContext(TodoContext);

  return (
    <>
      <HeaderContainer>
        <WelcomeMessage>
          {WELCOME}, {username}!
        </WelcomeMessage>
        <Button buttonStyle="danger" width="auto" onClick={handleUserLogout}>
          {LOGOUT}
        </Button>
      </HeaderContainer>
      <TitleYourTask>{YOUR_TASKS}</TitleYourTask>
    </>
  );
};

export default TodoHeader;
