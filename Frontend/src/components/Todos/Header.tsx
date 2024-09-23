import React from "react";
import { ButtonLogout, HeaderContainer ,WelcomeMessage, Title} from "../../styles/TodoStyles";
import { LOGOUT, YOUR_TASKS } from "../../constants/LABELS";
import { HeaderProps } from "../../interface/Todo/index";
import { WELCOME } from "../../constants/MESSAGES";

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <>
      <HeaderContainer>
        <WelcomeMessage>
          {WELCOME}, {username}!
        </WelcomeMessage>
        <ButtonLogout onClick={onLogout}>
          {LOGOUT}
        </ButtonLogout>
      </HeaderContainer>
      <Title style={{ textAlign: 'center' }}>{YOUR_TASKS}</Title>
    </>
  );
};

export default Header;
