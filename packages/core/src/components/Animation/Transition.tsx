import React, { FC, ReactElement, useCallback, useEffect, useRef } from 'react'

const addAnimation = (className: string) => {
  return ['animate__animated', `animate__${className}`]
}
const Transition: FC<{
  state: boolean
  children: ReactElement
  start?: string
  end?: string
}> = ({ state, children, start, end }) => {
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
    },
    [start, end]
  )

  useEffect(() => {
    animateRef.current?.addEventListener('animationend', animationend)
    return () => {
      animateRef.current?.removeEventListener('animationend', animationend)
    }
  }, [])

  useEffect(() => {
    if (state) {
      start && animateRef.current?.classList.add(...addAnimation(start))
    } else {
      end && animateRef.current?.classList.add(...addAnimation(end))
    }
  }, [state])

  return <div ref={animateRef}>{state && children}</div>
}

export default Transition
