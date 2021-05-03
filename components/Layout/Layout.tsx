import { FC } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/client'

import { Col, Container, Row } from 'react-bootstrap'
import { Navigation } from '../'

import styles from './Layout.module.css'

const Layout: FC<{ breadcrumb: any[]; children: any; session: any }> = ({ breadcrumb, children, session }) => {
  return (
    <Container fluid className={styles.globalContainer}>
      <Container fluid className={styles.header}>
        <Row>
          <Col>
            <Link href={`/`}>
              <h1 className={styles.logo}>Uptrain.</h1>
            </Link>
          </Col>
          <Col>
            {session && (
              <p className={styles.user}>
                <span>{session.user.email}</span>
                <span className={styles.logout} onClick={() => signOut()}>
                  logout
                </span>
              </p>
            )}
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
