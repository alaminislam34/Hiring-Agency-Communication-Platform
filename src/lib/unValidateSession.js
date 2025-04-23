import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

const useValidateSession = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.email) {
      signOut({ callbackUrl: "/signin" });
    }
  }, [session, status]);
};

export default useValidateSession;
