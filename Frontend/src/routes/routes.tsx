import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Todos from "../pages/Todos";
import AuthGuard from "../components/AuthGuard";
import NotFound from "../components/NotFound";

const routes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/todos"
      element={
        <AuthGuard>
          <Todos />
        </AuthGuard>
      }
    />
    <Route path="/" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export default routes;
