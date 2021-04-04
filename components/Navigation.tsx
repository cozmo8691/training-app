import { FC } from 'react'
import Link from 'next/link'

import { Breadcrumb } from 'react-bootstrap'

import styles from './Navigation.module.css'

const Navigation: FC<{ breadcrumb: { text: string; link?: string }[] }> = ({ breadcrumb = [] }) => (
  <Breadcrumb as="nav" className={styles.breadcrumb}>
    {breadcrumb.map((link, i) => (
      <>
        {i > 0 && '/'}
        {link.link ? (
          <Link key={link.text} href={link.link}>
            {link.text}
          </Link>
        ) : (
          <p key={link.text}>{link.text}</p>
        )}
      </>
    ))}
  </Breadcrumb>
)

export default Navigation
