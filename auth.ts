import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const username = process.env.ADMIN_USERNAME;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (
          !username ||
          !passwordHash ||
          typeof credentials.username !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const validUsername =
          credentials.username === username;

        const validPassword = await bcrypt.compare(
          credentials.password,
          passwordHash
        );

        if (!validUsername || !validPassword) {
          return null;
        }

        return {
          id: username,
          name: "Bishopric Administrator",
        };
      },
    }),
  ],
});