import _ from 'radash'
import {
  Pane,
  Text,
  IconButton,
  Card,
  majorScale
} from 'evergreen-ui'
import { Center, Split, Stack } from '../layout'
import * as t from '../../types'
import theme from 'src/styles'
import { HiOutlineEye } from 'react-icons/hi'
import { useBreakpoint, useElementSize } from 'src/hooks'


export default function WorkerGrid({
  workers = [],
  onView
}: {
  workers?: t.Worker[]
  onView?: (worker: t.Worker) => void
}) {
  const [sizeRef, size] = useElementSize()
  const bp = useBreakpoint()
  const columns = bp.select({
    'xsmall': 1,
    'small': 1,
    'medium': 2
  }, 3)
  return (
    <Pane
      display='grid'
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      columnGap={majorScale(4)}
      rowGap={majorScale(4)}
    >
      {workers.map((worker, i) => (
        <Card
          key={worker.id}
          padding={majorScale(2)}
          marginBottom={majorScale(2)}
          display='flex'
          flexDirection='column'
          elevation={1}
          ref={i === 0 ? sizeRef : undefined}
        >
          <Pane
            backgroundImage={`url("${worker.thumbnail?.url ?? '/logo-padded.png'}")`}
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            backgroundPosition='center top'
            width='100%'
            height={size.width}
            borderRadius={4}
          />
          <Split alignItems='center' marginTop={majorScale(1)}>
            <Text
              flex={1}
              marginTop={majorScale(1)}
              fontSize='22px'
              lineHeight='24px'
              fontWeight={600}
              fontFamily={theme.fonts.vollkorn}
            >
              {worker.name}
            </Text>
            <IconButton
              appearance='minimal'
              icon={<HiOutlineEye color={theme.colors.black} />}
              onClick={() => onView?.(worker)}
            />
          </Split>
          <Text>{worker.desiredRole}</Text>
        </Card>
      ))}
    </Pane>
  )
}