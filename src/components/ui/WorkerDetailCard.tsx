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



export default function WorkerDetailCard({
  worker,
  ...rest
}: {
  worker: t.Worker
} & t.ArgumentTypes<typeof Pane>[0]) {
  const bp = useBreakpoint()
  const distance = formatDistanceToNow(new Date(worker.createdAt))
  return (
    <Axis
      marginTop={majorScale(3)}
      $stackOrSplit={bp.at('medium', 'up') ? 'split' : 'stack'}
      {...rest}
    >
      <Pane
        marginRight={bp.at('medium', 'up') ? majorScale(4) : 0}
      >
        <Pane
          backgroundImage={`url("${worker.thumbnail?.url ?? '/logo-padded.png'}")`}
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
              {worker.name}
            </Heading>
          </Pane>
          <Pane>
            <Text>Added {distance} ago</Text>
          </Pane>
        </Pane>
      </Pane>
      <Card
        flex={1}
        elevation={0}
        maxWidth={700}
        minWidth={300}
        padding={majorScale(2)}
      >
        <Paragraph>
          {worker.description}
        </Paragraph>
      </Card>
    </Axis>
  )
}