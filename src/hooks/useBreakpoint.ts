import { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'


export type Breakpoint = 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'

export type Modifier = 'only' | 'up' | 'down'

const breakpointMap: Record<Breakpoint, number> = {
  'xsmall': 0,
  'small': 1,
  'medium': 2,
  'large': 3,
  'xlarge': 4
}

type BreakpointMap<T> = {
  'xsmall': T
  'small': T
  'medium': T
  'large': T
  'xlarge': T
}

export const BREAKPOINTS: Record<Breakpoint, number> = {
  xsmall: 0,    // all mobile devices
  small: 576,   // mobile devices (not sure which one's this big)
  medium: 768,  // ipad, ipad pro, ipad mini, etc
  large: 992,   // smaller laptops
  xlarge: 1200  // laptops and desktops
}

const getCurrentBreakpoint = (width: number): Breakpoint => {
  if (width < BREAKPOINTS.small) return 'xsmall'
  if (width < BREAKPOINTS.medium) return 'small'
  if (width < BREAKPOINTS.large) return 'medium'
  if (width < BREAKPOINTS.xlarge) return 'large'
  return 'xlarge'
}

export const useBreakpoint = () => {

  const [currentWidth, setCurrentWidth] = useState(0)
  const currentBreakpoint = getCurrentBreakpoint(currentWidth)

  const updateWidth = useCallback(debounce(() => setCurrentWidth(window.innerWidth), 200), [])

  useLayoutEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Force trigger rerender because when SSR current breakpoint 
  // will be 0 so when we hit the browser we need to re calculate
  const [, forceRerender] = useState(false)
  useEffect(() => {
    forceRerender(true)
  }, [])

  const showAt = (breakpoint: Breakpoint, modifier: Modifier = 'only') => {
    const current = breakpointMap[currentBreakpoint] // xsmall => 0
    const given = breakpointMap[breakpoint]         // small => 1 & up
    if (current == given) return true
    if (modifier == 'up') return current > given
    if (modifier == 'down') return current < given
    return false
  }

  const select = <T>(choices: Partial<BreakpointMap<T>>, defaultValue?: T): T => {
    const value = choices[currentBreakpoint]
    return value ?? defaultValue ?? undefined as any as T
  }

  const use = <T>(value: T, {
    at: breakpoint,
    and: modifier = 'only',
    else: defaultValue = null
  }: {
    at: Breakpoint
    and?: Modifier
    else?: T | null
  }): T => {
    const current = breakpointMap[currentBreakpoint] // xsmall => 0
    const given = breakpointMap[breakpoint]          // small => 1 & up
    if (current == given) return value
    if (modifier == 'up') return current > given ? value : defaultValue as T
    if (modifier == 'down') return current < given ? value : defaultValue as T
    return defaultValue as T
  }

  return {
    breakpoint: currentBreakpoint,
    width: currentWidth,
    select,
    use,
    showAt,
    at: showAt
  }
}

export default useBreakpoint