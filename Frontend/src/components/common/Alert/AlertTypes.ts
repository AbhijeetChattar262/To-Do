interface AlertProps {
  alertType:
  | "loginSuccess"
  | "authenticationFailed"
  | "invalidPassword"
  | "invalidUsername"
  | "registerSuccess"
  | "userAlreadyExists"
  | "registerFailed"
  | "taskCannotBeEmpty"
  | "credentialsCannotBeEmpty"
  | "logout"
  | "deleteTask"; // Define all possible alert types
  onConfirm?: () => void; // Optional callback for when the alert is confirmed
}

export default AlertProps;