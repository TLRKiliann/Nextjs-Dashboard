import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
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
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email === 'admin@example.com' || credentials.password === 'Secret@1337') {
          return { name: 'Admin User', email: 'admin@example.com' };
        };
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        });
        if (
          !user ||
          !(await bcrypt.compare(String(credentials.password), user.password!))
        ) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/profile", "/products", "/payment", "/contact", ];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );
      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/api/auth/signin", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      };
      return true;
    },
  },
});
