import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDB, course, lesson, screen } from '../../../db'

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
    // pages: {
    //   signIn: '/signin',
    // },
    callbacks: {
      async session(session, user) {
        session.user.id = user.id
        return session
      },
      async jwt(tokenPayload, user, account, profile, isNewUser) {
        const { db } = await connectToDB()

        if (isNewUser) {
          const defaultCourse = await course.createCourse(db, {
            name: 'Default course',
            createdBy: `${user.id}`,
          })
          const defaultLesson = await lesson.createLesson(db, {
            name: 'Getting Started',
            course: defaultCourse._id,
            createdBy: `${user.id}`,
          })
          await screen.createScreen(db, {
            name: 'Start Here',
            lesson: defaultLesson._id,
            createdBy: `${user.id}`,
            content: {
              time: 1556098174501,
              blocks: [
                {
                  type: 'header',
                  data: {
                    text: 'Some default content',
                    level: 2,
                  },
                },
              ],
              version: '2.12.4',
            },
          })
        }

        if (tokenPayload && user) {
          return { ...tokenPayload, id: `${user.id}` }
        }

        return tokenPayload
      },
    },
  })
