import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import Privateroute from "./pages/Privateroutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/todos" element={
        <Privateroute>
        <Todos />
        </Privateroute>
        } />
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
