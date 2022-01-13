import {
  Pane,
  Text,
  Heading,
  Paragraph,
  Link as EvergreenLink,
  minorScale,
  majorScale
} from 'evergreen-ui'
import Link from 'next/link'
import { Axis, Center, Split } from '../layout'
import * as t from '../../types'
import theme from 'src/styles'
import Header from 'src/components/ui/Header'
import Footer from 'src/components/ui/Footer'
import { HiCheck, HiMinus, HiX } from 'react-icons/hi'
import { useBreakpoint } from 'src/hooks'


export default function HomeScene() {

  const bp = useBreakpoint()

  return (
    <>
      <Header />
      <Center
        minHeight='calc(100vh - 50px)'
        backgroundImage={bp.at('medium', 'up') ? 'url("/star-circle.png")' : undefined}
        backgroundRepeat='no-repeat'
        backgroundSize='contain'
        backgroundPosition='center'
      >
        <Center>
          <Text
            fontSize='52px'
            fontWeight={400}
            fontFamily={theme.fonts.vollkorn}
            marginBottom={majorScale(3)}
          >
            deplorable
          </Text>
          <Paragraph
            maxWidth={500}
            textAlign='center'
            size={500}
            marginBottom={majorScale(4)}
            paddingX={majorScale(2)}
          >
            Find work and post job openings in a community that shares your deplorable values.
          </Paragraph>
          <Pane>
            <Link href="/post-job" passHref>
              <EvergreenLink
                paddingY={minorScale(2)}
                paddingX={minorScale(3)}
                marginRight={majorScale(1)}
                backgroundColor={theme.colors.black}
                borderRadius={20}
                border={`2px solid ${theme.colors.black}`}
                style={{
                  color: theme.colors.white
                }}
              >
                Post a Job
              </EvergreenLink>
            </Link>
            <Link href="/get-hired" passHref>
              <EvergreenLink
                paddingY={minorScale(2)}
                paddingX={minorScale(3)}
                marginLeft={majorScale(1)}
                borderRadius={20}
                border={`2px solid ${theme.colors.black}`}
                style={{
                  color: theme.colors.black
                }}
              >
                Get Hired
              </EvergreenLink>
            </Link>
          </Pane>
        </Center>
      </Center>
      <Pane
        paddingY={majorScale(20)}
        paddingX={bp.at('medium', 'up') ? majorScale(10) : majorScale(4)}
      >
        <Heading
          is='h2'
          fontSize='56px'
          lineHeight='60px'
          fontFamily={theme.fonts.vollkorn}
          marginBottom={majorScale(2)}
        >
          Values First
        </Heading>
        <Paragraph
          maxWidth={550}
          size={500}
          lineHeight='1.8em'
        >
          This platform is not about left or right. Really, it's not political at all. It's about values. Sadly, today, these two things are in conflict. Companies hold employees they trust in the highest regard. Employees can do their best work when they trust the leadership to have their back. Without shared values, there is no trust.
        </Paragraph>
        <Pane marginTop={majorScale(4)}>
          <Link href="/post-job" passHref>
            <EvergreenLink
              paddingY={minorScale(2)}
              paddingX={minorScale(3)}
              marginRight={majorScale(1)}
              backgroundColor={theme.colors.black}
              borderRadius={20}
              border={`2px solid ${theme.colors.black}`}
              style={{
                color: theme.colors.white
              }}
            >
              Post a Job
            </EvergreenLink>
          </Link>
          <Link href="/get-hired" passHref>
            <EvergreenLink
              paddingY={minorScale(2)}
              paddingX={minorScale(3)}
              marginLeft={majorScale(1)}
              borderRadius={20}
              border={`2px solid ${theme.colors.black}`}
              style={{
                color: theme.colors.black
              }}
            >
              Get Hired
            </EvergreenLink>
          </Link>
        </Pane>
        <Heading
          is='h3'
          size={900}
          fontFamily={theme.fonts.vollkorn}
          marginBottom={majorScale(2)}
          marginTop={majorScale(12)}
        >
          What are our values?
        </Heading>
        <Paragraph
          maxWidth={550}
          lineHeight='1.8em'
          size={500}
        >
          We value personal liberty, self-responsibility, and freedom of speech. Below is a more specific list that's relevant to the current climate.
        </Paragraph>
        <ValuesChart
          marginTop={majorScale(4)}
        />
      </Pane>
      <Footer />
    </>
  )
}

const ValuesChart = (props: t.ArgumentTypes<typeof Axis>[0]) => {
  return (
    <Pane
      maxWidth={650}
      {...props}
    >
      <Pane>
        <Text
          is='h4'
          marginBottom={majorScale(1)}
          fontSize='18px'
          fontFamily={theme.fonts.vollkorn}
          fontWeight={600}
        >
          Good Fit
        </Text>
        <Pane>
          <ValuesBox
            icon={<HiCheck color={theme.colors.success} />}
            label={`
              You value the 1st amendment without prejudice for — or against — certain
              ideological messages or groups.
            `}
          />
          <ValuesBox
            icon={<HiCheck color={theme.colors.success} />}
            label={`
              You believe in self responsibility, that it comes before a 
              group identity. You hold individuals responsible for their
              choices.
            `}
          />
          <ValuesBox
            icon={<HiCheck color={theme.colors.success} />}
            label={`
              You value others based on the content of their character, not their race, 
              ethnicity, sex, or religion.
            `}
          />
          <ValuesBox
            icon={<HiCheck color={theme.colors.success} />}
            label={`
              You can do life with people you disagree with, having
              respect for them and their opinions.
            `}
          />
        </Pane>
      </Pane>
      <Pane marginTop={majorScale(4)}>
        <Text
          is='h4'
          marginBottom={majorScale(1)}
          fontSize='18px'
          fontFamily={theme.fonts.vollkorn}
          fontWeight={600}
        >
          Does Not Matter
        </Text>
        <Pane>
          <ValuesBox
            icon={<HiMinus color={theme.colors.grey200} />}
            label={`
              Your political party association (Republican, Democrat, Libertarian).
            `}
          />
          <ValuesBox
            icon={<HiMinus color={theme.colors.grey200} />}
            label={`
              Your COVID vaccination status.
            `}
          />
          <ValuesBox
            icon={<HiMinus color={theme.colors.grey200} />}
            label={`
              Your race, ethnicity, sex, or religion.
            `}
          />
        </Pane>
      </Pane>
      <Pane marginTop={majorScale(4)}>
        <Text
          is='h4'
          marginBottom={majorScale(1)}
          fontSize='18px'
          fontFamily={theme.fonts.vollkorn}
          fontWeight={600}
        >
          Not a Good Fit
        </Text>
        <Pane>
          <ValuesBox
            icon={<HiX color={theme.colors.danger} />}
            label={`
              You believe diversity or inclusion officers are key positions in a company.
            `}
          />
          <ValuesBox
            icon={<HiX color={theme.colors.danger} />}
            label={`
              You support COVID vaccine mandates.
            `}
          />
          <ValuesBox
            icon={<HiX color={theme.colors.danger} />}
            label={`
              You believe half the population are hateful, 
              racist, right wing bigots.
            `}
          />
          <ValuesBox
            icon={<HiX color={theme.colors.danger} />}
            label={`
              You believe half the population are stupid, 
              lazy, far left ideologues.
            `}
          />
        </Pane>
      </Pane>
    </Pane>
  )
}

const ValuesBox = ({
  label,
  icon,
  ...rest
}: {
  label: string
  icon: JSX.Element | React.ElementType<any>
} & t.ArgumentTypes<typeof Split>[0]) => {
  return (
    <Split
      alignItems='baseline'
      border={`1px solid ${theme.colors.grey200}`}
      borderRadius={4}
      padding={majorScale(2)}
      marginBottom={majorScale(2)}
      {...rest}
    >
      <Pane
        marginRight='12px'
      >
        {icon}
      </Pane>
      <Paragraph>
        {label}
      </Paragraph>
    </Split>
  )
}