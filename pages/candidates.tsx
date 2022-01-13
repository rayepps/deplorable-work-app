import type { NextPage } from 'next'
import Head from 'next/head'
import CandidatesScene from '../src/components/scenes/Candidates'

const Candidates: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deplorable Work | Candidates</title>
      </Head>
      <CandidatesScene />
    </>
  )
}

export default Candidates
