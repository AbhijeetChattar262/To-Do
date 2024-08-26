import Alert from "../../components/Alert/Alert";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

const handleLogin = async (
  e: React.FormEvent,
  username: string,
  password: string,
  navigate: NavigateFunction
) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/login", {
      username,
      password,

    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", username);

    // Trigger the success alert
    Alert({
      alertType: "loginSuccess",
      onConfirm: () => navigate("/todos"), // Navigate after confirmation
    });
  } catch (error: any) {
    console.error("Login error", error);

    // Trigger the error alert
    Alert({ alertType: "authenticationFailed" });
  }
};

export default handleLogin;
