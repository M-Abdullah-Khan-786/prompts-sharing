import { connectDB } from "@/utils/database";
import NextAuth, { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user.model";

interface Profile {
  email?: string;
  name?: string;
  picture?: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      if (!session?.user || !session.user.email) {
        return session;
      }

      const sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ profile }: { profile?: Profile }) {
      try {
        await connectDB();
        const userExist = await User.findOne({
          email: profile?.email,
        });

        if (!userExist) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }

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
