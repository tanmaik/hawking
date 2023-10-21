import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const options = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
        },
        password: {
          label: "password",
        },
      },
      async authorize(credentials, req) {
        if (credentials?.newUser) {
          //create new user account on backend server
          // return user account
        }
        if (
          // check user against server
          credentials?.email === "tanmai@test.com" &&
          credentials.password === "admin"
        ) {
          // return correct user account with uid
          return {
            id: "1",
            name: "Tanmai Kalisipudi",
            email: "tanmai@test.com",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 10000,
  },
  pages: {
    signIn: "/api/auth/signin",
    newUser: "/api/auth/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
