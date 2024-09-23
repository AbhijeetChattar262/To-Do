import RegisterForm from "../components/Register/RegisterForm";
import RegisterHeader from "../components/Register/RegisterHeader";
import RegisterContainer from "../components/Register/RegisterContainer";

const Register: React.FC = () => {
  return (
    <RegisterContainer>
      <RegisterHeader />
      <RegisterForm />
    </RegisterContainer>
  );
};

export default Register;
