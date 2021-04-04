import React, { FC } from 'react'
import Link from 'next/link'
import { Container, Row, Card, Button } from 'react-bootstrap'
import { home } from '../content'
import Layout from '../components/Layout'

const Home: FC<{ content: { hero: any; features: any[] } }> = ({ content }) => {
  return (
    <Layout breadcrumb={[{ text: 'Home' }]}>
      <Link href={`/course/`}>
        <a>Courses</a>
      </Link>
    </Layout>
  )
}

Home.defaultProps = {
  content: {
    features: [{ title: 'default feature', body: 'default body' }],
    hero: { title: 'default title', body: 'default body' },
  },
}

export function getStaticProps() {
  return {
    props: {
      content: home.published,
    },
  }
}

export default Home
