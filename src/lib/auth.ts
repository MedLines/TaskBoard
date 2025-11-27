import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'

import { prisma } from '@/lib/prisma'

export const auth = betterAuth({
  // 2. Connect the Adapter
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // Change this to "mysql", "sqlite", etc. based on your DB
  }),

  // 3. define Auth methods (The screenshot implied generic user attributes, likely email/pass)
  emailAndPassword: {
    enabled: true,
  },

  // 4. Handle Custom Attributes (migration from getUserAttributes)
  // Better Auth handles basic fields automatically, but here is how you enforce 'username'
  // user: {
  //   additionalFields: {
  //     username: {
  //       type: 'string',
  //       required: true, // Set to false if you want it optional
  //       input: true, // Allows passing generic attributes during sign-up
  //     },
  //   },
  // },

  // Optional: Configure session caching or generic settings
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
    },
  },
  plugins: [nextCookies()],
})
