import type { NextPage } from 'next'
import Head from 'next/head'
import PostCandidate from '../src/components/scenes/PostCandidate'

const GetHired: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deplorable Work | Create Post</title>
      </Head>
      <PostCandidate />
    </>
  )
}

export default GetHired
