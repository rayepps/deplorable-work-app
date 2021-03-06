import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import JobsScene from '../src/components/scenes/Jobs'

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deplorable Work</title>
      </Head>
      <JobsScene />
    </>
  )
}

export default Index
