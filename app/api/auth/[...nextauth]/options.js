import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "stephen@cambridge.edu",
        },
        password: {
          label: "Password",
          type: "passowrd",
        },
      },
      async authorize(credentials, req) {
        if (
          credentials?.email === "stephen@cambridge.edu" &&
          credentials.password === "admin"
        ) {
          return {
            id: "1",
            name: "Stephen Hawking",
            email: "stephen@cambridge.edu",
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
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
