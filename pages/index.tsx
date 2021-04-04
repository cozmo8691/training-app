import React, { FC } from 'react'
import Link from 'next/link'
import { Box, Heading, Paragraph } from 'grommet'
import { home } from '../content'
import Layout from '../components/Layout'

const Home: FC<{ content: { hero: any; features: any[] } }> = ({ content }) => {
  return (
    <Layout>
      <Heading>Home</Heading>
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
