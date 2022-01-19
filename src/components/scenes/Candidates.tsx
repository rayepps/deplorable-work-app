import _ from 'radash'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Pane,
  Text,
  Heading,
  IconButton,
  Button,
  Card,
  Paragraph,
  Link as EvergreenLink,
  majorScale,
  minorScale,
  toaster
} from 'evergreen-ui'
import { Center, Split, Stack } from '../layout'
import * as t from '../../types'
import theme from 'src/styles'
import Header from 'src/components/ui/Header'
import Footer from 'src/components/ui/Footer'
import { useBreakpoint, useFetch, useLocationTracking } from 'src/hooks'
import Shimmer from 'src/components/ui/Shimmer'
import WorkerGrid from 'src/components/ui/WorkerGrid'
import api from 'src/api'
import WorkerDetailCard from 'src/components/ui/WorkerDetailCard'
import Modal from 'src/components/ui/Modal'
import { HiArrowRight } from 'react-icons/hi'


export default function CandidatesScene() {

  const bp = useBreakpoint()
  const listWorkersRequest = useFetch(api.workers.list)
  const [trackingRef, isIntersecting] = useLocationTracking()
  const [workers, setWorkers] = useState<t.Worker[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [reachedEnd, setReachedEnd] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<t.Worker | null>(null)

  const listWorkers = async () => {
    const { error, data } = await listWorkersRequest.fetch({
      pageSize: 20,
      page: pageNumber
    })
    if (error) {
      console.error(error)
      toaster.danger(error.details)
      return
    }
    if (data.workers.length === 0 || data.workers.length < 20) {
      setReachedEnd(true)
    }
    setWorkers([...workers, ...data.workers])
  }

  useEffect(() => {
    listWorkers()
  }, [pageNumber])

  useEffect(() => {
    if (listWorkersRequest.loading) return
    if (!isIntersecting) return
    if (reachedEnd) return
    setPageNumber(pageNumber + 1)
  }, [isIntersecting])

  return (
    <>
      <Modal
        open={!!selectedWorker}
        title='Candidate'
        onClose={() => setSelectedWorker(null)}
      >
        <WorkerDetailCard worker={selectedWorker as t.Worker} />
      </Modal>
      <Header />
      <Center
        paddingY={majorScale(20)}
        paddingX={bp.at('medium', 'up') ? majorScale(10) : majorScale(4)}
      >
        <Pane
          width='100%'
          maxWidth={800}
        >
          <Pane marginBottom={majorScale(4)}>
            <Split alignItems='center' marginBottom={majorScale(2)}>
              <Heading
                flex={1}
                is='h1'
                fontSize='36px'
                fontFamily={theme.fonts.vollkorn}
              >
                Candidates
              </Heading>
              <Link href='/get-hired' passHref>
                <EvergreenLink
                  paddingY={minorScale(2)}
                  paddingX={minorScale(3)}
                  border={`2px solid ${theme.colors.black}`}
                  borderRadius={50}
                  style={{
                    color: theme.colors.black
                  }}
                >
                  Add Profile
                </EvergreenLink>
              </Link>
            </Split>
            <Paragraph
              maxWidth={550}
              size={500}
              lineHeight='1.8em'
            >
              If you're new here be sure to check out our values. If you share
              our values and you're looking for a new position please post your 
              own profile, its free!
            </Paragraph>
            <Pane marginTop={majorScale(1)}>
              <Link href='/about' passHref>
                <EvergreenLink
                  size={400}
                  fontWeight={600}
                  display='flex'
                  alignItems='center'
                  cursor='pointer'
                >
                  View Values
                  <HiArrowRight style={{ marginLeft: majorScale(1) }} />
                </EvergreenLink>
              </Link>
            </Pane>
          </Pane>
          <WorkerGrid
            workers={_.sort(workers, w => new Date(w.createdAt).getTime(), true)}
            onView={setSelectedWorker}
          />
          <div
            style={{ visibility: 'hidden' }}
            ref={trackingRef}
          />
          {listWorkersRequest.loading && (
            <Pane>
              <Shimmer width='100%' height={80} marginBottom={majorScale(2)} />
              <Shimmer width='100%' height={80} marginBottom={majorScale(2)} />
              <Shimmer width='100%' height={80} marginBottom={majorScale(2)} />
            </Pane>
          )}
          {reachedEnd && (
            <Center marginTop={majorScale(8)}>
              <Text
                textAlign='center'
                size={600}
                fontFamily={theme.fonts.vollkorn}
                fontWeight={600}
              >
                The End
              </Text>
              <Paragraph
                textAlign='center'
                maxWidth={550}
              >
                If you know anyone hiring who shares our values please share
                Deplorable Work with them so they can add their openings.
              </Paragraph>
            </Center>
          )}
        </Pane>
      </Center>
      <Footer />
    </>
  )
}