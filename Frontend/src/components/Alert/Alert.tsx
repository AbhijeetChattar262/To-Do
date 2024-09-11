import Swal from "sweetalert2";
import alertConfigs from "./alertConfigs";

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

const Alert: React.FC<AlertProps> = ({ alertType, onConfirm }) => {
  const handleAlert = () => {
    Swal.fire(alertConfigs[alertType]).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      }
    });
  };

  return <>{handleAlert()}</>;
};

export default Alert;
