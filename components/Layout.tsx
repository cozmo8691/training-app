import { FC } from 'react'
import Link from 'next/link'
import { getSession, useSession, signIn, signOut } from 'next-auth/client'

import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import Navigation from './Navigation'

import styles from './Layout.module.css'

const Layout: FC<{ breadcrumb: any[]; children: any; session: any; isAdmin }> = ({
  breadcrumb,
  children,
  session,
  isAdmin,
}) => {
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
