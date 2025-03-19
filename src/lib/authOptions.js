import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import { login } from "@/app/actions/auth/loginUser";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, email, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log("credentials", credentials);
        const user = await login(credentials);
        console.log(user);
        if (!user) {
          return {
            success: false,
            message: "User does not exist",
          };
        } else {
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log("session data", session);
      if (token) {
        session.user.email = token.email;
        session.user.role = token?.role || "jobSeeker";
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("token data", token);
      if (user) {
        token.user.email = user.email;
        token.user.role = user?.role || "jobSeeker";
      }
      return token;
    },
  },
};
