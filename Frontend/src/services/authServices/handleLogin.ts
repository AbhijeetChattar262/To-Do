import Alert from "../../components/common/Alert/Alert";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { LOGIN_API_URL } from "../../constants/API_URLS";
import { LOGIN_SUCCESS_ALERT,AUTHENTICATION_FAILED_ALERT } from "../../constants/ALERTS";
import { LOGIN_ERROR } from "../../constants/CONSOLE_ERRORS";

const handleLogin = async (
  e: React.FormEvent,
  username: string,
  password: string,
  navigate: NavigateFunction
) => {
  e.preventDefault();
  try {
    const response = await axios.post(LOGIN_API_URL, {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", username);

    Alert({
      alertType: LOGIN_SUCCESS_ALERT,
      onConfirm: () => navigate("/todos"), 
    });
  } catch (error: any) {
    console.error({LOGIN_ERROR}, error);

    // Trigger the error alert
    Alert({ alertType: AUTHENTICATION_FAILED_ALERT });
  }
};

export default handleLogin;
