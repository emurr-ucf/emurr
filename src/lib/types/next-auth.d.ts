import NextAuth, { DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | undefined | null;
      lastName: string | undefined | null;
      email: string | undefined | null;
      image: string | undefined | null;
      role: string | undefined | null;
      jti: string | undefined | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string | undefined | null;
    lastName: string | undefined | null;
    email: string | undefined | null;
    image: string | undefined | null;
    role: string | undefined | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string | undefined | null;
    lastName: string | undefined | null;
    email: string | undefined | null;
    image: string | undefined | null;
    role: string | undefined | null;
    jti: string | undefined | null;
  }
}
