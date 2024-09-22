import axios from "axios";
import Alert from "../../components/Alert/Alert";
import { NavigateFunction } from "react-router-dom";
import { REGISTER_API_URL } from "../../constants/API_URLS";
import { isPasswordValid, isUsernameValid } from "../../helpers/username_passwordValidateHelper";
import { REGISTER_SUCCESS_ALERT, REGISTERATION_FAILED_ALERT, INVALID_USERNAME_ALERT, INVALID_PASSWORD_ALERT, USER_ALREADY_EXISTS_ALERT } from "../../constants/ALERTS";

const handleRegister = async (
  e: React.FormEvent,
  username: string,
  password: string,
  navigate: NavigateFunction
) => {
  e.preventDefault();
  if (username.trim() !== "" && password.trim() !== "") {
    if (isUsernameValid(username)) {
      if (isPasswordValid(password)) {
        try {
          await axios.post(REGISTER_API_URL, {
            username,
            password,
          });
          Alert({
            alertType: REGISTER_SUCCESS_ALERT,
            onConfirm: () => navigate("/login"), // Navigate after confirmation
          });
        } catch (err: any) {
          if (err.response?.status === 400) { // Assuming 400 indicates user already exists
            Alert({ alertType: USER_ALREADY_EXISTS_ALERT });
          } else {
            Alert({ alertType: REGISTERATION_FAILED_ALERT });
          }
        }
      }
      else {
        Alert({ alertType: INVALID_PASSWORD_ALERT });
      }
    }
    else {
      Alert({ alertType: INVALID_USERNAME_ALERT });
    }
  }

};

export default handleRegister;
