interface AlertProps {
    alertType:
      | "loginSuccess"
      | "authenticationFailed"
      | "invalidPassword"
      | "invalidUsername"
      | "registerSuccess"
      | "registerFailed"
      | "taskCannotBeEmpty"
      | "logout"
      | "deleteTask"; // Define all possible alert types
    onConfirm?: () => void; // Optional callback for when the alert is confirmed
  }

export default AlertProps;