import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const existingUser = await db.user.findUnique({
            where: { email: email },
          });

          if (!existingUser) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            existingUser.password,
          );

          if (!passwordsMatch) {
            return null;
          }

          // console.log(existingUser);
          return {
            id: `${existingUser.id}`,
            name: existingUser.name,
            email: existingUser.email,
          };
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
