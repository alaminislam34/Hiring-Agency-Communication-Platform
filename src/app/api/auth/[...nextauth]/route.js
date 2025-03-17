import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
