import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collection } from "./dbConnect";
import { signIn } from "next-auth/react";

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
        username: { label: "Email", type: "email", placeholder: "Enter email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Credentials data", credentials);
        // Add logic here to look up the user from the credentials supplied
        const user = await loginUser(credentials);
        console.log(user);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        console.log(user);
        const { providerAccountId } = account;
        const userCollection = dbConnect(collection.user_collection);
        const { name, email: user_email, image } = user;
        const isExisted = userCollection.findOne({
          providerAccountId,
        });
        if (!isExisted) {
          const payload = { name, email: user_email, image, role: "jobSeeker" };
          await userCollection.insertOne({
            payload,
          });
        }
      }

      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    // async session({ session, token, user }) {
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};
