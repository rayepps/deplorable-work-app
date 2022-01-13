import {
  Pane,
  Popover,
  Position,
  IconButton,
  Menu,
  Link as EvergreenLink,
  majorScale,
  minorScale,
  Image
} from 'evergreen-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Split } from '../layout'
import theme from 'src/styles'
import { useBreakpoint } from 'src/hooks'
import { HiMenu } from 'react-icons/hi'

export default function Header() {
  const bp = useBreakpoint()
  return (
    <Split
      padding={majorScale(2)}
      borderBottom={`1px solid ${theme.colors.grey200}`}
      alignItems='center'
    >
      <Pane flex={1}>
        <Link href="/" passHref>
          <a>
            <Image
              src="/wordmark@2x.png"
              height={40}
            />
          </a>
        </Link>
      </Pane>
      {bp.showAt('small', 'up') && (
        <FullSizeMenu />
      )}
      {bp.showAt('xsmall') && (
        <MobileMenu />
      )}
    </Split>
  )
}

const MobileMenu = () => {
  const { push } = useRouter()
  const goto = (path: string) => () => push(path)
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item onSelect={goto('/post-job')}>Post Job</Menu.Item>
            <Menu.Item onSelect={goto('/jobs')}>View Jobs</Menu.Item>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item onSelect={goto('/get-hired')}>Post Candidate Profile</Menu.Item>
            <Menu.Item onSelect={goto('/candidates')}>View Candidates</Menu.Item>
          </Menu.Group>
        </Menu>
      }
    >
      <IconButton icon={<HiMenu />} />
    </Popover>
  )
}

const FullSizeMenu = () => {
  const { pathname } = useRouter()
  return (
    <Pane>
      {pathname !== '/candidates' && (
        <Link href="/candidates" passHref>
          <EvergreenLink
            paddingY={minorScale(2)}
            paddingX={minorScale(3)}
            border={`2px solid ${theme.colors.black}`}
            borderRadius={50}
            style={{
              color: theme.colors.black
            }}
          >
            View Candidates
          </EvergreenLink>
        </Link>
      )}
      {pathname !== '/jobs' && (
        <Link href="/jobs" passHref>
          <EvergreenLink
            paddingY={minorScale(2)}
            paddingX={minorScale(3)}
            marginLeft={majorScale(2)}
            backgroundColor={theme.colors.black}
            border={`2px solid ${theme.colors.black}`}
            borderRadius={50}
            style={{
              color: theme.colors.white
            }}
          >
            View Jobs
          </EvergreenLink>
        </Link>
      )}
    </Pane>
  )
}