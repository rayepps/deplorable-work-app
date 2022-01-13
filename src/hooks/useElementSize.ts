import { useLayoutEffect, useRef, useState, useEffect, MutableRefObject, useCallback } from 'react'


export const useElementSize = (initialSize?: {
  width?: number
  height?: number
}): [(instance: HTMLElement | null) => void, { width: number, height: number }] => {

  const ref = useRef<Element>()
  const [size, setSize] = useState({
    width: initialSize?.width ?? 0,
    height: initialSize?.height ?? 0
  })

  const setRef = useCallback((node) => {
    if (!node) return
    ref.current = node
    setSize({
      width: node.clientWidth,
      height: node.clientHeight
    })
  }, [])

  const handleResize = useCallback<ResizeObserverCallback>((entries) => {
    if (!entries || entries.length === 0) return
    const [entry] = entries
    setSize({
      width: entry.contentRect.width,
      height: entry.contentRect.height
    })
  }, [])

  useEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver(handleResize)
    observer.observe(ref.current)
    return () => {
      observer.unobserve(ref.current!)
    }
  }, [ref.current])
  
  useLayoutEffect(() => {
    if (!ref.current) return
    setSize({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight
    })
  }, [ref.current])

  return [setRef as any as (instance: HTMLElement | null) => void, size]
}