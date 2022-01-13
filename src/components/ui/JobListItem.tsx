import _ from 'radash'
import { useEffect, useState } from 'react'
import {
  Pane,
  Text,
  Heading,
  Card,
  IconButton,
  Paragraph,
  Link as EvergreenLink,
  majorScale,
  toaster
} from 'evergreen-ui'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Center, Split } from '../layout'
import * as t from '../../types'
import theme from 'src/styles'
import { useBreakpoint, useFetch, useLocationTracking } from 'src/hooks'
import { HiOutlineEye } from 'react-icons/hi'


export default function JobListItem(props: {
  onView?: () => void
  job: t.Job
} & t.ArgumentTypes<typeof Card>[0]) {
  const bp = useBreakpoint()
  return bp.at('medium', 'up')
    ? (<HorizontalJobListItem {...props} />)
    : (<VerticalJobListItem {...props} />)
}

function HorizontalJobListItem({
  job,
  onView,
  ...rest
}: {
  onView?: () => void
  job: t.Job
} & t.ArgumentTypes<typeof Card>[0]) {
  const distance = formatDistanceToNow(new Date(job.createdAt))
  return (
    <Card
      padding={majorScale(2)}
      marginBottom={majorScale(2)}
      display='flex'
      flexDirection='row'
      elevation={1}
      alignItems='center'
      {...rest}
    >
      <Pane
        backgroundImage={`url("${job.thumbnail?.url ?? '/logo-padded.png'}")`}
        backgroundRepeat='no-repeat'
        backgroundSize='cover'
        backgroundPosition='center'
        width={60}
        height={60}
        borderRadius={4}
      />
      <Pane flex={1} paddingLeft={majorScale(2)}>
        <Split>
          <Heading
            flex={1}
            size={500}
            fontFamily={theme.fonts.vollkorn}
          >
            {job.title}
          </Heading>
          <Text>{distance} ago</Text>
        </Split>
        <Split>
          <Text flex={1}>{job.company?.name} | {job.location}</Text>
          <IconButton
            appearance='minimal'
            icon={<HiOutlineEye color={theme.colors.black} />}
            onClick={onView}
          />
        </Split>
      </Pane>
    </Card>
  )
}

function VerticalJobListItem({
  job,
  onView,
  ...rest
}: {
  onView?: () => void
  job: t.Job
} & t.ArgumentTypes<typeof Card>[0]) {
  const distance = formatDistanceToNow(new Date(job.createdAt))
  return (
    <Card
      padding={majorScale(2)}
      marginBottom={majorScale(2)}
      elevation={1}
      {...rest}
    >
      <Pane
        backgroundImage={`url("${job.thumbnail?.url ?? '/logo-padded.png'}")`}
        backgroundRepeat='no-repeat'
        backgroundSize='cover'
        backgroundPosition='center'
        width='100%'
        height={200}
        borderRadius={4}
      />
      <Pane marginTop={majorScale(2)}>
        <Heading
          flex={1}
          size={500}
          fontFamily={theme.fonts.vollkorn}
        >
          {job.title}
        </Heading>
      </Pane>
      <Pane>
        <Text>{job.company?.name} | {job.location}</Text>
      </Pane>
      <Split alignItems='center'>
        <Text size={300} flex={1}>{distance} ago</Text>
        <IconButton
          appearance='minimal'
          icon={<HiOutlineEye color={theme.colors.black} />}
          onClick={onView}
        />
      </Split>
    </Card>
  )
}