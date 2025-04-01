import { connectDB } from "@/utils/database";
import NextAuth, { AuthOptions } from "next-auth";
import type { Profile, Account, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
      try {
        await connectDB();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
