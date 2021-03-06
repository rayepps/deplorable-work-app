import React, { SyntheticEvent, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { 
  Pane, 
  Heading, 
  majorScale, 
  Button
} from 'evergreen-ui'
import { HiX } from 'react-icons/hi'
import { Center, Split } from 'src/components/layout'
import theme from 'src/styles'
import { createGlobalStyle } from 'styled-components'


interface Props {
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
  title?: string
  hideHeader?: boolean
}

export default function ModalWrapper(props: Props) {
  const [isBrowser, setIsBrowser] = useState(false)

  // Makes sure render only happens in browser
  // not in next ssr
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (isBrowser) {
    const root = document.getElementById('modal-root')
    if (root) {
      return ReactDOM.createPortal((<Modal {...props} />), root) as JSX.Element
    }
  }
  return null
}

const BodyScrollLock = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const Modal = ({
  open = false,
  onClose,
  children,
  title,
  hideHeader = false
}: Props) => {
  const handleCloseClick = (e: SyntheticEvent) => {
    e.preventDefault()
    onClose?.()
  }
  return !open ? null : (
    <>
      <BodyScrollLock />
      <Pane
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        position='fixed'
        width='100vw'
        height='100vh'
        top={0}
        left={0}
        backgroundColor='rgba(0, 0, 0, 0.5)'
        onClick={handleCloseClick}
      >
        <Pane
          overflowY='scroll'
          maxHeight='80vh'
          maxWidth={800}
          padding={majorScale(4)}
          backgroundColor={theme.colors.white}
          borderRadius={4}
          onClick={(e: SyntheticEvent) => e.stopPropagation()}
        >
          {!hideHeader && (
            <Split alignItems='center'>
              <Pane flex={1}>
                {title && <Heading>{title}</Heading>}
              </Pane>
              <Button 
                appearance='minimal'
                onClick={handleCloseClick}
                color={theme.colors.black}
              >
                close
              </Button>
            </Split>
          )}
          <Pane className='x-modal-content'>
            {children}
          </Pane>
        </Pane>
      </Pane>
    </>
  )
}