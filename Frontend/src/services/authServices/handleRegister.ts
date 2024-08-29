import axios from "axios";
import Alert from "../../components/Alert/Alert";
import { NavigateFunction } from "react-router-dom";

const handleRegister = async (
  username: string,
  password: string,
  navigate: NavigateFunction
) => {
  try {
    await axios.post("http://localhost:5000/register", {
      username,
      password,
    });
    Alert({
      alertType: "registerSuccess",
      onConfirm: () => navigate("/login"), // Navigate after confirmation
    });
  } catch (err: any) {
    Alert({ alertType: "registerFailed" });
  }
};

export default handleRegister;
