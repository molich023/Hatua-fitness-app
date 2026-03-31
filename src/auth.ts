import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { render } from "@react-email/components";
import React from "react";
import { db } from "./db"; 
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { WelcomeMagicLink } from "./emails/WelcomeMagicLink";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "HATUA <hello@hatua.fitness>", 
      async sendVerificationRequest({ identifier, url, provider }) {
        const emailHtml = await render(React.createElement(WelcomeMagicLink, { url }));
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: provider.from,
            to: identifier,
            subject: "Your HATUA Magic Link 🦁",
            html: emailHtml,
          }),
        });
      },
    }),
  ],
  callbacks: {
    // This allows the 'plan' and 'trialExpires' to be used in your React components
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.plan = (user as any).plan;
        session.user.trialExpires = (user as any).trialExpires;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      await db.update(users)
        .set({
          plan: "simba_trial",
          trialExpires: expiresAt,
          points: 0,
        })
        .where(eq(users.id, user.id));
    },
  },
  pages: { signIn: "/auth/signin" },
});
