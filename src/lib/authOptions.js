import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { loginUser } from "@/app/actions/auth/loginUser";
import { collection, getCollection } from "./mongodb";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        return user || null;
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
    async signIn({ user }) {
      try {
        const { name, email } = user;
        if (!email) return false;

        const userCollection = await getCollection(collection.user_collection);
        const userExist = await userCollection.findOne({ email });

        if (!userExist) {
          // New social login user → insert without password
          await userCollection.insertOne({
            name,
            email,
            role: "jobSeeker",
            isVerified: true,
            createdAt: new Date(),
          });

          user.role = "jobSeeker";
          user.isVerified = true;
        } else {
          // Existing user → use role and verified status
          user.role = userExist.role;
          user.isVerified = userExist.isVerified;
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id?.toString() || user.id;
        token.role = user.role || "jobSeeker";
        token.isVerified = user.isVerified ?? true;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isVerified = token.isVerified;
        session.user.email = token.email;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
