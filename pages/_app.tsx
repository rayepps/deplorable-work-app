import Head from 'next/head'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import { BreakpointProvider } from 'react-socks'
import np from 'nprogress'

import 'src/styles/reset.css'
import 'src/styles/index.css'
import 'src/styles/nprogress.css'
import 'src/components/ui/Breakpoint/breakpoint.css'

Router.events.on('routeChangeStart', () => np.start())
Router.events.on('routeChangeComplete', () => np.done())
Router.events.on('routeChangeError', () => np.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link href="/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <meta content="Find work and post openings in a community that shares your deplorable values." name="description" />
        <meta content="Deplorable Jobs" property="og:title" />
        <meta content="Find work and post openings in a community that shares your deplorable values." property="og:description" />
        <meta content="/preview.png" property="og:image" />
        <meta content="Deplorable Jobs" property="twitter:title" />
        <meta content="Find work and post openings in a community that shares your deplorable values." property="twitter:description" />
        <meta content="/preview.png" property="twitter:image" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;600;800&display=swap" rel="stylesheet" />
      </Head>
      <BreakpointProvider>
        <Component {...pageProps} />
      </BreakpointProvider>
    </>
  )
}

export default MyApp
