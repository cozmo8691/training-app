import { FC } from 'react'
import Link from 'next/link'

import { Box, Footer, Header, Heading, Main, Paragraph, Text } from 'grommet'

const Layout: FC<{ children: any }> = ({ children }) => {
  return (
    <Box margin="none" pad="none">
      <Header background="brand" margin="none" pad="medium">
        <Link href={`/`}>
          <Heading style={{ fontWeight: 300, color: 'white' }}>Uptrain.</Heading>
        </Link>
      </Header>
      <Main pad="large" height={{ min: '400px' }}>
        {children}
      </Main>
      <Footer background="brand" pad="xlarge">
        <Text>Copyright</Text>
      </Footer>
    </Box>
  )
}

export default Layout
