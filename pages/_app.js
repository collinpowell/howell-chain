import '../styles/globals.css';

import { ThemeProvider } from 'theme-ui';
import { StickyProvider } from '../contexts/app/app.provider';

import theme from '../theme';
import Layout from '../UIKit/layout'


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StickyProvider>
    </ThemeProvider>

  )
}

export default MyApp
