import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { loginUser } from "@/app/actions/auth/loginUser";
import dbConnect, { collection } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        if (user) {
          return user;
        } else {
          return null;
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
    // When user signs in via Google/GitHub
    async signIn({ user }) {
      try {
        const { name, email } = user;

        if (!email) return false;

        const userCollection = dbConnect(collection.user_collection);
        const userExist = await userCollection.findOne({ email });

        if (!userExist) {
          await userCollection.insertOne({
            name,
            email,
            role: "jobSeeker",
            isVerified: true,
            createdAt: new Date(),
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    // Validate session: check if user still exists in DB
    async session({ session }) {
      try {
        const userCollection = dbConnect(collection.user_collection);
        const userExist = await userCollection.findOne({
          email: session?.user?.email,
        });

        if (!userExist) {
          // Session invalid since user was deleted
          return null;
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return null;
      }
    },
  },
};
