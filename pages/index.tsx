import React, { FC } from 'react'
import { getSession, useSession } from 'next-auth/client'

import { UserSession } from '../types'
import { Home, Layout } from '../components'

const Courses: FC<{ content?: any; breadcrumb?: any[]; isAdmin?: boolean }> = ({ content, breadcrumb, isAdmin }) => {
  const [session] = useSession()

  console.log(session)
  console.log(isAdmin)

  return (
    <Layout breadcrumb={breadcrumb} session={session}>
      <Home />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session: { user: UserSession } = await getSession(context)

  return {
    props: {
      session,
      breadcrumb: [{ text: 'Home' }],
    },
  }
}

export default Courses
