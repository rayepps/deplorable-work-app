import type { NextPage } from 'next'
import Head from 'next/head'
import JobsScene from '../src/components/scenes/Jobs'

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deplorable Work | Jobs</title>
      </Head>
      <JobsScene />
    </>
  )
}

export default About
