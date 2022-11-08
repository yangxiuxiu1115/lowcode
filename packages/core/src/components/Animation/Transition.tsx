import React, {
  cloneElement,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

const addAnimation = (isEnter: boolean, className?: string) => {
  if (className) {
    return ['animate__animated', `animate__${className}`]
  } else {
    if (isEnter) {
      return ['animate__animated', 'animate__bounceInRight']
    } else {
      return ['animate__animated', 'animate__bounceOutRight']
    }
  }
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
      if (state) {
        this.classList.remove('animate__animated')
        if (start) {
          this.classList.remove(`animate__${start}`)
        } else {
          this.classList.remove('animate__bounceInRight')
        }
        if (end) {
          this.classList.remove(`animate__${end}`)
        } else {
          this.classList.remove('animate__bounceOutRight')
        }
      } else {
        setCurrent(null)
      }
      this.removeEventListener('animationend', animationend)
    },
    [start, end, state]
  )

  useEffect(() => {
    if (state) {
      setCurrent(children)
    } else {
      animateRef.current?.classList.add(...addAnimation(false, end))
      animateRef.current?.addEventListener('animationend', animationend)
    }
  }, [state])

  useEffect(() => {
    if (current) {
      animateRef.current?.classList.add(...addAnimation(true, start))
      animateRef.current?.addEventListener('animationend', animationend)
    }
  }, [current])

  return (
    <>
      {current &&
        cloneElement(current, {
          ref: animateRef,
        })}
    </>
  )
}

export default Transition
