import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import NextAuth from "next-auth";

import { IAccountDoc } from "@/database/account.model";
import { api } from "@/lib/api";
import { ActionResponse } from "@/types/global";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        const { data: exis1ngAccount, success } =
          (await api.accounts.getByProvider(
            account.type === "credentials"
              ? token.email!
              : account.providerAccountId,
          )) as ActionResponse<IAccountDoc>;

        if (!success || !exis1ngAccount) return token;

        const userId = exis1ngAccount.userId;

        if (userId) token.sub = userId.toString();
      }
      return token;
    },
    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === "github"
            ? (profile?.login as string)
            : (profile?.name?.toLowerCase() as string),
      };

      const { success } = (await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as "google" | "github",
        providerAccountId: account.providerAccountId,
      })) as ActionResponse;

      if (!success) return false;
      return true;
    },
  },
});
