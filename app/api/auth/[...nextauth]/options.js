import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import axios from "axios";

export const options = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        id: { label: "id" },
        email: {
          label: "email",
        },
        password: {
          label: "password",
        },
      },
      async authorize(credentials, req) {
        console.log(typeof credentials.newUser);
        console.log(
          process.env.NEXT_PUBLIC_ACCESS_TOKEN +
            " this is the public access otken "
        );
        if (credentials.newUser === "true") {
          console.log("THIS IS A NEW USER");
          let user;

          await axios
            .post(
              `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/signup`,
              {
                email: credentials.email,
                password: credentials.password,
              },
              {
                headers: {
                  ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
                },
              }
            )
            .then(async (res) => {
              user = await res.data.user;
            })
            .catch((err) => {
              console.log("WE broke" + err);
            });
          user = {
            name: user.id,
            email: user.email,
          };
          console.log(user);
          return user;
        }
        console.log("this is not a new user ");
        let user;
        await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/login`,
          method: "POST",
          headers: {
            ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
          },
          data: {
            email: credentials.email,
            password: credentials.password,
          },
        })
          .then(async (res) => {
            console.log(
              "This is the data that I'm logging: " + JSON.stringify(res.data)
            );
            user = res.data.user;
          })
          .catch((err) => {
            console.log("This is the error that I'm logging: " + err);
            return null;
          });
        console.log(user);
        user = {
          name: user.id,
          email: user.email,
        };
        return user;
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
