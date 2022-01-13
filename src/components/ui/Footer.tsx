import {
  Pane,
  Paragraph,
  Heading,
  majorScale
} from 'evergreen-ui'
import { Center } from '../layout'
import theme from 'src/styles'


export default function Footer() {
  return (
    <Center
      paddingY={majorScale(4)}
    >
      <Pane
        backgroundImage='url("/do_not_comply.jpeg")'
        backgroundPosition='center'
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
        width={80}
        height={80}
        borderRadius='50%'
      />
    </Center>
  )
}