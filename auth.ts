import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = "bishopric";
        const passwordHash = "$2b$10$v9am5i9HIs6cWcAwd4fsoukHAU4s17jH2R7sEjPOU5mKopg6UyZfa";

        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        if (credentials.username !== username) {
          return null;
        }

        const validPassword = await bcrypt.compare(
          String(credentials.password),
          passwordHash
        );

        if (!validPassword) {
          return null;
        }

        return { id: username, name: "Bishopric Administrator" };
      },
    }),
  ],
});