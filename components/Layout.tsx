import { FC } from 'react'
import Link from 'next/link'

import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import Navigation from './Navigation'

import styles from './Layout.module.css'

const Layout: FC<{ breadcrumb: any[]; children: any }> = ({ breadcrumb, children }) => {
  return (
    <Container fluid className={styles.globalContainer}>
      <Container fluid className={styles.header}>
        <Row>
          <Col>
            <Link href={`/`}>
              <h1 className={styles.logo}>Uptrain.</h1>
            </Link>
          </Col>
        </Row>
      </Container>
      <Navigation breadcrumb={breadcrumb} />
      <main className={styles.main}>{children}</main>
      <Container fluid className={styles.footer}>
        <p>Copyright</p>
      </Container>
    </Container>
  )
}

export default Layout
