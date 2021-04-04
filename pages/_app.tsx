import { Grommet, grommet as grommetTheme } from 'grommet'
import 'reflect-metadata'
import { Provider } from 'next-auth/client'

import '../styles/globals.css'

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    colors: {
      brand: '#47B881',
    },
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Grommet theme={theme}>
        <Component {...pageProps} />
      </Grommet>
    </Provider>
  )
}

export default MyApp
