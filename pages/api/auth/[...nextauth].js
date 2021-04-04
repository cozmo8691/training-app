import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDB, course, lesson, screen, admin } from '../../../db'

export default (req, res) =>
  NextAuth(req, res, {
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    // Configure one or more authentication providers
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      Providers.Email({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),

      // ...add more providers here
    ],

    database: process.env.DATABASE_URL,
    pages: {
      signOut: '/',
    },
    callbacks: {
      async session(session, user) {
        session.user.id = user.id
        return session
      },
      async jwt(tokenPayload, user, account, profile, isNewUser) {
        if (tokenPayload && user) {
          return { ...tokenPayload, id: `${user.id}` }
        }

        return tokenPayload
      },
    },
  })
