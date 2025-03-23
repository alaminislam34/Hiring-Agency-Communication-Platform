import { ToastContainer } from "react-toastify";
import SignInComponent from "./components/signIn";

const SignIn = async () => {
  return (
    <div className="flex justify-center items-center min-h-[550px]">
      <SignInComponent />

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SignIn;
