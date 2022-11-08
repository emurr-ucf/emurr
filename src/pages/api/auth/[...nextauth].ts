import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";

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
          const res = await fetch(
            process.env.NODE_ENV === "production"
              ? "https://chdr.cs.ucf.edu/emurr/api/user/login"
              : "http://localhost:3000/api/user/login",
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );
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
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      url = process.env.NODE_ENV === "production" ? "/emurr/" : "" + url;

      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt: async ({ token, profile, user }) => {
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
