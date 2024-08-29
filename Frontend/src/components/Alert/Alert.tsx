import Swal from "sweetalert2";
import alertConfigs from "./alertConfigs";

interface AlertProps {
  alertType:
    | "loginSuccess"
    | "authenticationFailed"
    | "registerSuccess"
    | "registerFailed"
    | "logout"; // Define all possible alert types
  onConfirm?: () => void; // Optional callback for when the alert is confirmed
}

const Alert: React.FC<AlertProps> = ({ alertType, onConfirm }) => {
  const handleAlert = () => {
    Swal.fire(alertConfigs[alertType]).then(() => {
      if (onConfirm) {
        onConfirm();
      }
    });
  };

  return <>{handleAlert()}</>;
};

export default Alert;
