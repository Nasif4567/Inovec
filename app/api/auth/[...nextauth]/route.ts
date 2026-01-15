import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  // Inside your authOptions object
callbacks: {
  async jwt({ token, user, trigger, session }) {
    // 1. Initial login: populate token with DB data
    if (user) {
      token.id = user.id;
      token.zohoCusID = user.zohoCusID;
      token.phone = user.phone;
      token.address = user.address;
      token.city = user.city;
      token.zip = user.zip;
    }

    // 2. THIS IS THE MISSING PIECE: Handle manual updates
    if (trigger === "update" && session?.user) {
      // Spread the new data into the existing token
      return { ...token, ...session.user };
    }

    return token;
  },
  async session({ session, token }) {
    // Pass the token data to the session object
    if (session.user) {
      session.user.id = token.id as string;
      session.user.zohoCusID = token.zohoCusID as string;
      session.user.phone = token.phone as string;
      session.user.address = token.address as string;
      session.user.city = token.city as string;
      session.user.zip = token.zip as string;
    }
    return session;
  },
},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
