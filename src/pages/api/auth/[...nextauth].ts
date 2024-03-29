import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import { urlLocalPath, urlPath } from "../../../lib/urlPath";

export default NextAuth({
  // Lets our Providers Work with Prisma.
  adapter: PrismaAdapter(prisma),
  // All of the Sign-In Options Shown.
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ? process.env.GITHUB_ID : "",
      clientSecret: process.env.GITHUB_SECRET ? process.env.GITHUB_SECRET : "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID
        : "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
        ? process.env.GOOGLE_CLIENT_SECRET
        : "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...").
      name: "Credentials",

      // Credentials needed.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password...",
        },
      },
      async authorize(credentials, req) {
        // API Request.
        if (credentials) {
          const res: any = await fetch(`${urlPath}/api/user/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          var resJson = await res.json();
        }
        // If API Works.
        if (resJson.error === "") {
          return resJson.user;
        } else {
          // Returning null displays a error advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  // Lets us replace built-in Next-Auth pages with custom ones.
  pages: {
    signIn: "/login",
    error: `${urlLocalPath}/login`,
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      const userAccount = await prisma.account.findFirst({
        where: {
          user: {
            email: user.email,
          },
        },
      });

      if (userAccount && account.provider !== userAccount.provider)
        return false;
      return true;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.lastName = user.lastName;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
