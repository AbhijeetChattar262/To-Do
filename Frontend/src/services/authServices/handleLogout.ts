import { NavigateFunction } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

const handleLogout = (navigate: NavigateFunction) => {
  Alert({
    alertType: "logout",
    onConfirm: () => {
      localStorage.removeItem("token"); // Clear the token
      localStorage.removeItem("username"); // Clear the username
      navigate("/login"); // Redirect to login page
    },
  });
};

export default handleLogout;
