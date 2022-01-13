import type { NextPage } from 'next'
import Head from 'next/head'
import PostJobScene from '../src/components/scenes/PostJob'

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deplorable Work | Create Job Post</title>
      </Head>
      <PostJobScene />
    </>
  )
}

export default About
