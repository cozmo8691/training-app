import React, { FC } from 'react'
import Link from 'next/link'
import { Container, Button, Jumbotron } from 'react-bootstrap'
import { home } from '../content'
import Layout from '../components/Layout'

const Home: FC<{ content: { hero: any; features: any[] } }> = ({ content }) => {
  return (
    <Layout breadcrumb={[{ text: 'Home' }]}>
      <Jumbotron>
        <h1>{content.hero.title}</h1>
      </Jumbotron>
      <Container fluid className="homeButtons">
        <Link href={`/course/`}>
          <Button variant="primary">View my courses</Button>
        </Link>
      </Container>
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
