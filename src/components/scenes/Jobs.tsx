import _ from 'radash'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Pane,
  Text,
  Heading,
  Card,
  Paragraph,
  Link as EvergreenLink,
  majorScale,
  minorScale,
  toaster
} from 'evergreen-ui'
import { Center, Split } from '../layout'
import * as t from '../../types'
import theme from 'src/styles'
import Header from 'src/components/ui/Header'
import Footer from 'src/components/ui/Footer'
import { useBreakpoint, useFetch, useLocationTracking } from 'src/hooks'
import Shimmer from 'src/components/ui/Shimmer'
import JobListItem from 'src/components/ui/JobListItem'
import JobDetailCard from 'src/components/ui/JobDetailCard'
import Modal from 'src/components/ui/Modal'
import api from 'src/api'


export default function JobsScene() {

  const bp = useBreakpoint()
  const listJobsRequest = useFetch(api.jobs.list)
  const [trackingRef, isIntersecting] = useLocationTracking()
  const [jobs, setJobs] = useState<t.Job[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [reachedEnd, setReachedEnd] = useState(false)
  const [selectedJob, setSelectedJob] = useState<t.Job | null>(null)

  const listJobs = async () => {
    const { error, data } = await listJobsRequest.fetch({
      pageSize: 20,
      page: pageNumber
    })
    if (error) {
      console.error(error)
      toaster.danger(error.details)
      return
    }
    if (data.jobs.length === 0 || data.jobs.length < 20) {
      setReachedEnd(true)
    }
    setJobs([...jobs, ...data.jobs])
  }

  useEffect(() => {
    listJobs()
  }, [pageNumber])

  useEffect(() => {
    if (listJobsRequest.loading) return
    if (!isIntersecting) return
    if (reachedEnd) return
    setPageNumber(pageNumber + 1)
  }, [isIntersecting])

  return (
    <>
      <Modal 
        open={!!selectedJob}
        title={selectedJob?.company?.name}
        onClose={() => setSelectedJob(null)}
      >
        <JobDetailCard job={selectedJob as t.Job} />
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
          <Pane marginBottom={majorScale(2)}>
            <Split alignItems='center' marginBottom={majorScale(2)}>
              <Heading
                flex={1}
                is='h1'
                fontSize='36px'
                fontFamily={theme.fonts.vollkorn}
              >
                Job Openings
              </Heading>
              <Link href='/post-job' passHref>
                <EvergreenLink
                  paddingY={minorScale(2)}
                  paddingX={minorScale(3)}
                  border={`2px solid ${theme.colors.black}`}
                  borderRadius={50}
                  style={{
                    color: theme.colors.black
                  }}
                >
                  Add Job
                </EvergreenLink>
              </Link>
            </Split>
            <Paragraph
              maxWidth={550}
              size={500}
              lineHeight='1.8em'
            >
              If you're new here be sure to check out our home page and values. If you're a company that shares
              our values please post your jobs, its free!
            </Paragraph>
          </Pane>
          <Pane>
            {_.sort(jobs, j => new Date(j.createdAt).getTime(), true).map(job => (
              <JobListItem key={job.id} job={job} onView={() => setSelectedJob(job)} />
            ))}
          </Pane>
          <div
            style={{ visibility: 'hidden' }}
            ref={trackingRef}
          />
          {listJobsRequest.loading && (
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
