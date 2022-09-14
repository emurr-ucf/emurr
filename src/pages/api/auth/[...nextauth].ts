import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/prisma';

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
        clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : "",
    }),
    CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...").
			name: "Credentials",
			
			// Credentials needed.
			credentials: {
				email: { label: "Email", type: "text", placeholder: "email@email.com" },
				password: {  label: "Password", type: "password", placeholder: "Password..." }
			},
			async authorize(credentials, req) {
				console.log("Test1");
				// API Request.
				if(credentials) {
					console.log("Test");
					const res = await fetch("http://localhost:3000/api/user/login", {
						method: 'POST',
						body: JSON.stringify(credentials),
						headers: { "Content-Type": "application/json" }
					})
				var user = await res.json();
				}
				// If API Works.
				if(user.error === "") {
					return user.user;
				} 
				else {
					// Returning null displays a error advising the user to check their details.
					return null
				}
			}
		}),
  	],
	// Lets us replace built-in Next-Auth pages with custom ones.
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
    session: async ({session, user}) => {
      session.jwt = user.jwt;
      session.id = user.id;
      return Promise.resolve(session);
    },
    jwt: async ({token, user, account}) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        if (account.type == 'credentials') {
          token.jwt = user.jwt;
          token.id = user.id;
        } else {
          var fetch_url = `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`;
          let response = await fetch(fetch_url, params);
          const data = await response.json();
          token.jwt = data.jwt;
          token.id = data.user.id;
        }
      }
      return Promise.resolve(token);
    },
  },
})
