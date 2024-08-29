import React from "react";
import { Button } from "react-bootstrap";

interface HeaderProps {
  username: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-center mt-4">Welcome back, {username}!</h3>
        <Button variant="danger" onClick={onLogout}>
          Logout
        </Button>
      </div>
      <h1 className="text-center">Your Todos</h1>
    </>
  );
};

export default Header;
