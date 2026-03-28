import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db"; // Our Drizzle client
import { users } from "./schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Hatua Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Fetch user from Neon DB
        const [user] = await db.select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        if (!user) throw new Error("Akaunti haipatikani (Account not found)");

        // 2. Verify Bcrypt hash
        const isValid = await bcrypt.compare(credentials.password as string, user.password);
        if (!isValid) throw new Error("Nenosiri si sahihi (Incorrect password)");

        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
          image: user.avatar, // Using avatar for the profile image
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    }
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  session: { strategy: "jwt" }
});
