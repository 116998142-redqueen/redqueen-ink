// Demo auth — no Google OAuth needed
// @ts-nocheck
import { NextAuth } from '@auth/nextjs'
import Google from '@auth/core/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || 'demo',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || 'demo',
    }),
  ],
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET || 'demo-secret-not-for-production',
})
