import axios from "axios";
import Alert from "../components/common/Alert/Alert";
import { NavigateFunction } from "react-router-dom";
import { LOGIN_API_URL, REGISTER_API_URL } from "../constants/api-urls";
import {
  LOGIN_SUCCESS_ALERT,
  AUTHENTICATION_FAILED_ALERT,
  REGISTER_SUCCESS_ALERT,
  REGISTERATION_FAILED_ALERT,
  INVALID_USERNAME_ALERT,
  INVALID_PASSWORD_ALERT,
  USER_ALREADY_EXISTS_ALERT,
  CREDENTIALS_CANNOT_BE_EMPTY_ALERT,
  LOGOUT_ALERT,
} from "../constants/alerts";
import { isPasswordValid, isUsernameValid } from "../helpers/username-password-validator";


// ============================================= AuthService class started =================================================
export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }


  // ============================================= handleLogin service started ===================================================
  public async handleLogin(
    e: React.FormEvent,
    username: string,
    password: string,
    navigate: NavigateFunction
  ): Promise<void> {
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
      console.error({ LOGIN_ERROR: "Error during login" }, error);
      Alert({ alertType: AUTHENTICATION_FAILED_ALERT });
    }
  }

  // ============================================= handleLogin service ended ===================================================


  // ============================================= handleRegister service started =================================================
  public async handleRegister(
    e: React.FormEvent,
    username: string,
    password: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction
  ): Promise<void> {
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
              onConfirm: () => navigate("/login"),
            });
          } catch (err: any) {
            if (err.response?.status === 409) {
              // 409 indicates user already exists
              setUsername("");
              setPassword("");
              Alert({ alertType: USER_ALREADY_EXISTS_ALERT });
            } else {
              Alert({ alertType: REGISTERATION_FAILED_ALERT });
            }
          }
        } else {
          Alert({ alertType: INVALID_PASSWORD_ALERT });
        }
      } else {
        Alert({ alertType: INVALID_USERNAME_ALERT });
      }
    } else {
      Alert({ alertType: CREDENTIALS_CANNOT_BE_EMPTY_ALERT });
    }
  }

  // ============================================= handleRegister service ended =================================================



  // ============================================= handleLogout service started =================================================

  public handleLogout(navigate: NavigateFunction): void {
    Alert({
      alertType: LOGOUT_ALERT,
      onConfirm: () => {
        localStorage.removeItem("token"); // Clear the token
        localStorage.removeItem("username"); // Clear the username
        navigate("/login"); // Redirect to login page
      },
    });
  }
}

// ============================================= handleLogout service ended =================================================


// ============================================= AuthService class ended =================================================



// ============================================= Exporting instance of AuthService =================================================
export default AuthService.getInstance();
