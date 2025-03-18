import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { username, password } = credentials;
        const user = await dbConnect("users").findOne({ userName: username });
        const isPasswordOk = password == user.password;

        if (isPasswordOk) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log(session);
      // if (token) {
      //   session.user.userName = token.userName;
      //   session.user.role = token?.role || "seeker";
      // }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(token);
      // if (user) {
      //   token.user.userName = user.userName;
      //   token.user.role = user?.role || "seeker";
      // }
      return token;
    },
  },
};
