import { SweetAlertOptions } from "sweetalert2";
import {
  SuccessAlert,
  ErrorAlert,
  WarningAlert,
  InfoAlert,
  ButtonStyles,
} from "./AlertStyles";

const alertConfigs: Record<string, SweetAlertOptions> = {
  loginSuccess: {
    icon: "success",
    title: "Login Successful",
    text: "Welcome back!",
    customClass: {
      container: SuccessAlert,
      confirmButton: ButtonStyles,
    },
  },
  authenticationFailed: {
    icon: "error",
    title: "Authentication Failed!!",
    text: "Enter correct credentials",
    customClass: {
      container: ErrorAlert,
      confirmButton: ButtonStyles,
    },
  },
  invalidPassword: {
    icon: "error",
    title: "Invalid Password!!",
    text: "Password must be at least 6 characters long, with at least 1 uppercase letter, 1 number & 1 special character.",
    customClass: {
      container: WarningAlert,
      confirmButton: ButtonStyles,
    },
  },
  invalidUsername: {
    icon: "error",
    title: "Invalid Username!!",
    text: "Username must have at least 4 characters. Only letters and numbers are allowed.",
    customClass: {
      container: InfoAlert,
      confirmButton: ButtonStyles,
    },
  },
  registerSuccess: {
    icon: "success",
    title: "Registration Successful",
    text: "You can now log in!",
    customClass: {
      container: SuccessAlert,
      confirmButton: ButtonStyles,
    },
  },
  userAlreadyExists: {
    icon: "error",
    title: "Username Already Exists!!",
    text: "Please choose a different username.",
    customClass: {
      container: ErrorAlert,
      confirmButton: ButtonStyles,
    },
  },
  registerFailed: {
    icon: "error",
    title: "Registration Failed!!",
    text: "An error occurred!!. Please try again.",
    customClass: {
      container: ErrorAlert,
      confirmButton: ButtonStyles,
    },
  },
  taskCannotBeEmpty: {
    icon: "error",
    title: "Task cannot be empty",
    text: "Please enter a task!",
    customClass: {
      container: ErrorAlert,
      confirmButton: ButtonStyles,
    },
  },
  credentialsCannotBeEmpty: {
    icon: "error",
    title: "Credentials cannot be empty",
    text: "Please enter credentials!",
    customClass: {
      container: ErrorAlert,
      confirmButton: ButtonStyles,
    },
  },
  logout: {
    icon: "info",
    title: "Logout",
    text: "Are you sure you want to log out?",
    showCancelButton: true,
    customClass: {
      confirmButton: ButtonStyles,
      cancelButton: ButtonStyles,
    },
  },
  deleteTask: {
    icon: "warning",
    title: "Delete Task",
    text: "Are you sure you want to delete this task?",
    showCancelButton: true,
    customClass: {
      confirmButton: ButtonStyles,
      cancelButton: ButtonStyles,
    },
  },
};

export default alertConfigs;
