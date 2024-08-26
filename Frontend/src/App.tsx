import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todos"
          element={isLoggedIn ? <Todos /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Todos /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
