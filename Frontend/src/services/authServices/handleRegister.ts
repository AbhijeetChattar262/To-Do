import axios from "axios";
import Alert from "../../components/Alert/Alert";
import { NavigateFunction } from "react-router-dom";
import { REGISTER_API_URL } from "../../constants/API_URLS";

const handleRegister = async (
  username: string,
  password: string,
  navigate: NavigateFunction
) => {
  try {
    await axios.post(REGISTER_API_URL, {
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
