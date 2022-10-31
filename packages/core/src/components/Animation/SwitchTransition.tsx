import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

let isMounted = false
const addAnimation = (className?: string) => {
  return ['animate__animated', `animate__${className}`]
}
const SwitchTransition: FC<{
  children: ReactElement
  start?: string
  end?: string
  state: number | boolean | string
}> = ({ children, start, end, state }) => {
  const [current, setCurrent] = useState<ReactElement | null>(null)
  const animationRef = useRef<HTMLDivElement>(null)

  
  const animationend = useCallback(
    function (this: HTMLDivElement) {
      this.classList.remove('animate__animated')
      if (start) {
        this.classList.remove(`animate__${start}`)
      }
      if (end) {
        this.classList.remove(`animate__${end}`)
      }
      if (!isMounted) {
        isMounted = true
      } else {
        animationRef.current?.classList.add(...addAnimation(start))
      }
      setCurrent(children)
      this.removeEventListener('animationend', animationend)
    },
    [start, end]
  )

  useEffect(() => {
    if (!isMounted) {
      if (start) animationRef.current?.classList.add(...addAnimation(start))
    } else {
      if (current) {
        animationRef.current?.classList.add(...addAnimation(end))
      }
    }
    animationRef.current?.addEventListener('animationend', animationend)
  }, [state])

  return <div ref={animationRef}>{current || children}</div>
}

export default SwitchTransition
