import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Admin from "@/models/admin";
import { connectToDB } from "@/utils/database";

interface ICredentials {
  username: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      type: "credentials",
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials: ICredentials, req): Promise<any> {
        // Add logic here to look up the user from the credentials supplied
        await connectToDB();

        const { username, password } = credentials;

        const loggedAdmin = await Admin.findOne({ userName: username });

        if (!loggedAdmin) throw new Error("Admin not found");

        if (!loggedAdmin.validPassword(password, loggedAdmin.password))
          throw new Error("Incorrect password");

        /*return jwt.sign(
          { adminId: loggedAdmin._id, adminName: loggedAdmin.fullName },
          process.env.JWT_SECRET,
          {
            expiresIn: "10m",
          },
        );*/

        return { adminId: loggedAdmin._id, adminName: loggedAdmin.fullName };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token };
    },
    async session({ session, token, user }) {
      return { ...session };
    },
  },
  /* pages: {
    signIn: "/", //sigin page
  }, */
  session: {
    strategy: "jwt",
  },
};
