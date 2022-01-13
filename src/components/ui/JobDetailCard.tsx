import _ from 'radash'
import { useEffect, useState } from 'react'
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
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Center, Split, Stack, Axis } from '../layout'
import * as t from '../../types'
import theme from 'src/styles'
import { useBreakpoint } from 'src/hooks'



export default function JobDetailCard({
  job,
  ...rest
}: {
  job: t.Job
} & t.ArgumentTypes<typeof Pane>[0]) {
  const bp = useBreakpoint()
  const distance = formatDistanceToNow(new Date(job.createdAt))
  return (
    <Axis
      marginTop={majorScale(3)}
      $stackOrSplit={bp.at('medium', 'up') ? 'split' : 'stack'}
      {...rest}
    >
      <Pane flex={1} paddingRight={majorScale(4)} marginBottom={majorScale(2)}>
        <Pane
          backgroundImage={`url("${job.thumbnail?.url ?? '/logo-padded.png'}")`}
          backgroundRepeat='no-repeat'
          backgroundSize='cover'
          backgroundPosition='center'
          width={160}
          height={160}
          borderRadius={4}
        />
        <Pane flex={1} marginTop={majorScale(2)}>
          <Pane>
            <Heading
              flex={1}
              size={500}
              fontFamily={theme.fonts.vollkorn}
            >
              {job.title}
            </Heading>
          </Pane>
          <Pane>
            <Text>Added {distance} ago</Text>
          </Pane>
          <EvergreenLink
            href={job.link}
            display='inline-block'
            paddingY={minorScale(2)}
            paddingX={minorScale(3)}
            marginTop={majorScale(3)}
            border={`2px solid ${theme.colors.black}`}
            backgroundColor={theme.colors.black}
            borderRadius={50}
            style={{
              color: theme.colors.white
            }}
          >
            Apply Now
          </EvergreenLink>
        </Pane>
      </Pane>
      <Card
        flex={1}
        elevation={0}
        minWidth={300}
        maxWidth={700}
        padding={majorScale(2)}
      >
        <Paragraph>
          {job.description}
        </Paragraph>
      </Card>
    </Axis>
  )
}