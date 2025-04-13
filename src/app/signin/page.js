import { ToastContainer } from "react-toastify";
import SignInComponent from "./components/signIn";

const SignIn = async () => {
  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <SignInComponent />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SignIn;
