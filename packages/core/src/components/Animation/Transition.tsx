import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

const addAnimation = (className: string) => {
  return ['animate__animated', `animate__${className}`]
}
const Transition: FC<{
  state: boolean
  children: ReactElement
  start?: string
  end?: string
}> = ({ state, children, start, end }) => {
  const [current, setCurrent] = useState<ReactElement | null>(null)
  const animateRef = useRef<HTMLDivElement>(null)
  const animationend = useCallback(
    function (this: HTMLDivElement) {
      this.classList.remove('animate__animated')
      if (start) {
        this.classList.remove(`animate__${start}`)
      }
      if (end) {
        this.classList.remove(`animate__${end}`)
      }
      if (!state) {
        setCurrent(null)
      }
      this.removeEventListener('animationend', animationend)
    },
    [start, end, state]
  )

  useEffect(() => {
    if (state) {
      setCurrent(children)
      start && animateRef.current?.classList.add(...addAnimation(start))
    } else {
      end && animateRef.current?.classList.add(...addAnimation(end))
    }
    animateRef.current?.addEventListener('animationend', animationend)
  }, [state])

  return <div ref={animateRef}>{current}</div>
}

export default Transition
