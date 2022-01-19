import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import AboutScene from '../src/components/scenes/About'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deplorable Work</title>
      </Head>
      <AboutScene />
    </>
  )
}

export default Home
