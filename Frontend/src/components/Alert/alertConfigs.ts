import { SweetAlertOptions } from "sweetalert2";

const alertConfigs: Record<string, SweetAlertOptions> = {
  loginSuccess: {
    icon: "success",
    title: "Login Successful",
    text: "Welcome back!",
    background: "#d4edda",
    color: "#155724",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Proceed",
  },
  authenticationFailed: {
    icon: "error",
    title: "Authentication Failed",
    text: "Enter correct credentials!!",
    background: "#f8d7da",
    color: "#721c24",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Try Again",
  },
  invalidPassword: {
    icon: "error",
    title: "Invalid Password",
    text: "Username must have at least 4 characters. Only letters and numbers are allowed.",
    background: "#fff3cd",  // Light yellow
    color: "#856404",       // Dark gold text
    confirmButtonColor: "#ffc107",  // Yellow button
    confirmButtonText: "Fix Password",
  },
  invalidUsername: {
    icon: "error",
    title: "Invalid Username",
    text: "Password must be at least 6 characters long, with at least 1 uppercase letter, 1 number & 1 special character.",
    background: "#d1ecf1",  // Light blue
    color: "#0c5460",       // Dark blue text
    confirmButtonColor: "#17a2b8",  // Blue button
    confirmButtonText: "Fix Username",
  },
  
  registerSuccess: {
    icon: "success",
    title: "Registration Successful",
    text: "You can now log in!",
    background: "#d4edda",
    color: "#155724",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Login",
  },
  userAlreadyExists: {
    icon: "error",
    title: "Username Already Exists",
    text: "Please choose a different username.",
    background: "#f8d7da",
    color: "#721c24",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Try Again",
  }
  ,
  registerFailed: {
    icon: "error",
    title: "Registration Failed",
    text: "An error occurred. Please try again.",
    background: "#f8d7da",
    color: "#721c24",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Try Again",
  },
  taskCannotBeEmpty: {
    icon: "error",
    title: "Task cannot be empty",
    text: "Please enter a task.",
    background: "#f8d7da",
    color: "#721c24",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Try Again",
  },
  logout: {
    icon: "info",
    title: "Logout",
    text: "Are you sure you want to log out?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log out",
    cancelButtonText: "Cancel",
  },
  deleteTask: {
    icon: "warning",
    title: "Delete Task",
    text: "Are you sure you want to delete this task?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
  },
};

export default alertConfigs;
