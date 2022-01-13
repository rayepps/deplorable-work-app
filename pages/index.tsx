import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import HomeScene from '../src/components/scenes/Home'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deplorable Work</title>
      </Head>
      <HomeScene />
    </>
  )
}

export default Home
