import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getSession, useSession, signIn, signOut } from 'next-auth/client'
import { Container, Modal, Jumbotron, Row, Card, Button } from 'react-bootstrap'

import { connectToDB, admin, course, lesson, screen } from '../db'
import { UserSession } from '../types'
import Screen from '../components/Screen'
import Layout from '../components/Layout'
import Home from '../components/Home'

const Courses: FC<{ content?: any; breadcrumb?: any[]; isAdmin?: boolean }> = ({ content, breadcrumb, isAdmin }) => {
  const router = useRouter()
  const [session, loading] = useSession()

  console.log(session)
  console.log(isAdmin)

  return (
    <Layout breadcrumb={breadcrumb} session={session} isAdmin={isAdmin}>
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
