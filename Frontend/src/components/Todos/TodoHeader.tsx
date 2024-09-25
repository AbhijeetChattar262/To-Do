// TodoHeader.tsx
import React from "react";
import { HeaderContainer, WelcomeMessage, TitleYourTask } from "../../styles/TodoStyles";
import { LOGOUT, YOUR_TASKS } from "../../constants/LABELS";
import { HeaderProps } from "../../interface/Todo/index";
import { WELCOME } from "../../constants/MESSAGES";
import Button from "../common/Button/Button";

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <>
      <HeaderContainer>
        <WelcomeMessage>
          {WELCOME}, {username}!
        </WelcomeMessage>
        <Button buttonStyle="danger" width="auto" onClick={onLogout}>
          {LOGOUT}
        </Button>
      </HeaderContainer>
      <TitleYourTask>{YOUR_TASKS}</TitleYourTask>
    </>
  );
};

export default Header;
