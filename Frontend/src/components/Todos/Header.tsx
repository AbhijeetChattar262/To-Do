import React from "react";
import { Button } from "react-bootstrap";
import { LOGOUT, YOUR_TASKS } from "../../constants/HEADINGS";

interface HeaderProps {
  username: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  const headerStyle = {
    padding: "10px",
    display: "inline-block", 
    minWidth: "200px",
    textAlign: "center" as "center", 
    marginRight: "auto",
    marginLeft: "0",
  };

  const welcomeTextStyle = {
    margin: "0",
    color: "#007bff", 
    fontFamily: "cursive",
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div style={headerStyle}>
          <h3 style={welcomeTextStyle}>Welcome, {username}!</h3>
        </div>
        <Button variant="danger" className="me-2 mx-1" onClick={onLogout}>
          {LOGOUT}
        </Button>
      </div>
      <h1 className="text-center">{YOUR_TASKS}</h1>
    </>
  );
};

export default Header;
