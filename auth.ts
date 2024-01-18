import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import GithubProvider from "next-auth/providers/github";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
