import { useState, useRef, useCallback, MutableRefObject } from 'react'



export const useLocationTracking = (initIsIntersecting: boolean = false): [(node: any) => void, boolean] => {
  const observer = useRef<IntersectionObserver>()
  const [isIntersecting, setIsIntersecting] = useState<boolean>(initIsIntersecting)

  const refFunc = useCallback((node) => {
    observer.current?.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      setIsIntersecting(entries[0].isIntersecting)
    })
    if (node) {
      observer.current.observe(node)
    }
  }, []) as (node: any) => void

  return [refFunc, isIntersecting]
}