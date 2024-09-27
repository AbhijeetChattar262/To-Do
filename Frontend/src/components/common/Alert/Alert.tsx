import Swal from "sweetalert2";
import alertConfigs from "./alertConfigs";
import AlertProps from "./AlertTypes";

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
