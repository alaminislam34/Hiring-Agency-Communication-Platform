import { ToastContainer } from "react-toastify";
import SignInComponent from "./components/signIn";

const SignIn = async () => {
  return (
    <div className="md:min-h-[650px] min-h-[600px] flex items-center justify-center w-11/12 mx-auto ">
      <SignInComponent />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SignIn;
