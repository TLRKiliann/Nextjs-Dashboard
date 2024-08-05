import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { 
    strategy: "jwt"
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: {
          type: "email",
          placeholder: "Email address",
        },
        password: { placeholder: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email)
          },
        });
        if (!user || !(await bcrypt.compare(String(credentials.password), user.password!))) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
          role: user.role
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub) {
        session.user.id = token.sub;
      }    
        return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/profile", "/products", "/order", "/contact"];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );
      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/api/auth/signin", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return NextResponse.redirect(redirectUrl);
      };
      return true;
    },
  },
});
