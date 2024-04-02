import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
