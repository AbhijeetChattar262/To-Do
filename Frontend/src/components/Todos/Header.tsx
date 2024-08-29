import React from "react";
import { Button } from "react-bootstrap";

interface HeaderProps {
  username: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  const headerStyle = {
    padding: "10px",
    display: "inline-block", // Adjust width to fit content
    minWidth: "200px", // Minimum width
    textAlign: "center" as "center", // TypeScript compatibility
    marginRight: "auto",
    marginLeft: "0" // Align to the left
  };

  const welcomeTextStyle = {
    margin: "0",
    color: "#007bff", // Blue text color
    fontFamily: "cursive" // Cursive font
  };


  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div style={headerStyle}>
          <h3 style={welcomeTextStyle}>Welcome, {username}!</h3>
        </div>
        <Button variant="danger"  className="me-2 mx-1" onClick={onLogout}>
          Logout
        </Button>
      </div>
      <h1 className="text-center">Your Todos</h1>
    </>
  );
};

export default Header;
