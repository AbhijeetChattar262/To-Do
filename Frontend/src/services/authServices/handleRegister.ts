import axios from "axios";
import Alert from "../../components/Alert/Alert";
import { NavigateFunction } from "react-router-dom";
import { REGISTER_API_URL } from "../../constants/API_URLS";
import { isPasswordValid, isUsernameValid } from "../../helpers/username_passwordValidateHelper";
import { REGISTER_SUCCESS_ALERT, REGISTERATION_FAILED_ALERT, INVALID_USERNAME_ALERT, INVALID_PASSWORD_ALERT, USER_ALREADY_EXISTS_ALERT,CREDENTIALS_CANNOT_BE_EMPTY_ALERT } from "../../constants/ALERTS";

const handleRegister = async (
  e: React.FormEvent,
  username: string,
  password: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
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
          if (err.response?.status === 409) { // 409 indicates user already exists

            // Clear the input fields
            setUsername("");
            setPassword("");
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
  else{
    Alert({ alertType: CREDENTIALS_CANNOT_BE_EMPTY_ALERT });
  }

};

export default handleRegister;
