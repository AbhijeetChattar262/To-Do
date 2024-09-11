import axios from "axios";
import Alert from "../../components/Alert/Alert";
import { NavigateFunction } from "react-router-dom";
import { REGISTER_API_URL } from "../../constants/API_URLS";
import { isPasswordValid, isUsernameValid } from "../../helpers/username_passwordValidateHelper";

const handleRegister = async (
  username: string,
  password: string,
  navigate: NavigateFunction
) => {  
  if (username.trim() !== "" && password.trim() !== "") {
    if(isUsernameValid(username)){
      if(isPasswordValid(password)){
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
      }
      else{
        Alert({alertType:"invalidPassword"});
      }
    }
    else{
      Alert({alertType:"invalidUsername"});
    }
  }
  
};

export default handleRegister;
