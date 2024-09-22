import { NavigateFunction } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import { LOGOUT_ALERT } from "../../constants/ALERTS";

const handleLogout = (navigate: NavigateFunction) => {
  Alert({
    alertType:LOGOUT_ALERT,
    onConfirm: () => {
      localStorage.removeItem("token"); // Clear the token
      localStorage.removeItem("username"); // Clear the username
      navigate("/login"); // Redirect to login page
    },
  });
};

export default handleLogout;
