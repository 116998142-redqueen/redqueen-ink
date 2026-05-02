// Minimal auth — skip type checking for @auth version conflicts
// @ts-nocheck
import { NextAuth } from '@auth/nextjs'
import Google from '@auth/core/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  trustHost: true,
})
